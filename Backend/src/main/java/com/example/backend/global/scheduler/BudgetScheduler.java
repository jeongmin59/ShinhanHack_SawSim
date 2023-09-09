package com.example.backend.global.scheduler;

import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.repository.BudgetRepository;
import com.example.backend.domain.common.redis.service.RedisService;
import com.example.backend.domain.payment.Payment;
import com.example.backend.domain.payment.PaymentType;
import com.example.backend.domain.payment.repository.PaymentRepository;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.repository.PlanRepository;
import com.example.backend.global.scheduler.dto.AccountHistoryResponse;
import com.example.backend.global.scheduler.dto.SOLPushNotificationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class BudgetScheduler {

    private final PlanRepository planRepository;
    private final BudgetRepository budgetRepository;
    private final PaymentRepository paymentRepository;
    private final RedisService redisService;

    @Scheduled(cron = "1 0 0 * * *")
    public void saveTodayBudgetToRedis() {
        LocalDate today = LocalDate.now();

        List<Plan> plans = planRepository.findByDate(today);

        for (Plan plan : plans) {
            // 여행있는 계좌의 오늘 예산 계획 불러오기
            List<Budget> budgets = budgetRepository.findAllByPlanAndTravelDate(plan, today);
            long totalAmount = budgets.stream().mapToLong(Budget::getAmount).sum();

            redisService.setValues(86400, "todayBudget_" + plan.getAccount().getNumber(), String.valueOf(totalAmount));
        }
    }

    @Scheduled(cron = "59 29/59 * * * *")
    public void callAccountHistoryApi() {
        LocalDate today = LocalDate.now();

        List<Plan> plans = planRepository.findByDate(today);

        for (Plan plan : plans) {
            // 오늘 여행을 가야하는 계좌의 최근 조회 날짜 불러오기(redis)
            Map<Object, Object> hash = redisService.getHash(plan.getAccount().getUserNumber());

            AccountHistoryResponse accountHistoryResponse = callAccountHistoryApi(plan.getAccount().getNumber());
            List<AccountHistoryResponse.Transaction> transactionList = accountHistoryResponse.getDataBody().get거래내역();

            List<Payment> payments = new ArrayList<>();
            for (AccountHistoryResponse.Transaction transaction : transactionList) {
                if (transaction.get거래일자().equals(hash.get("latestDate").toString()) &&
                        transaction.get거래시간().equals(hash.get("latestTime").toString())) break;
                if (transaction.get입지구분() == 1) continue;

                payments.add(Payment.createPayment(
                        transaction.get내용(),
                        transaction.get출금금액(),
                        transaction.get거래점명(),
                        transaction.get거래일자(),
                        transaction.get거래시간(),
                        PaymentType.CARD,
                        plan.getAccount()));
            }
            paymentRepository.saveAll(payments);

            long todayBudget = Long.parseLong(redisService.getValues(plan.getAccount().getNumber()));
            List<Payment> paymentList = paymentRepository.findByAccountAndTransactionDate(plan.getAccount(), today);

            long totalAmount = paymentList.stream()
                    .mapToLong(Payment::getAmount)
                    .sum();

            String userNumber = plan.getAccount().getUserNumber();
            String username = plan.getAccount().getUsername();
            if (todayBudget <= totalAmount) {
                callPushNotificationApi(userNumber, username); // TODO: 수행결과 "N" 이면 예외처리해주기(지금은 무조건 성공 나옴)
            }
        }
    }

    private AccountHistoryResponse callAccountHistoryApi(String accountNumber) {
        Map<String, String> dataHeader = new HashMap<>();
        dataHeader.put("apikey", "2023_Shinhan_SSAFY_Hackathon");

        Map<String, String> dataBody = new HashMap<>();
        dataBody.put("계좌번호", accountNumber);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("dataHeader", dataHeader);
        requestBody.put("dataBody", dataBody);

        String url = "https://shbhack.shinhan.com/v1/search/transaction";

        // RestTemplate 사용
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<AccountHistoryResponse> response =
                restTemplate.postForEntity(url, entity, AccountHistoryResponse.class);

        return response.getBody();
    }

    private SOLPushNotificationResponse callPushNotificationApi(String userNumber, String username) {
        Map<String, String> dataHeader = new HashMap<>();
        dataHeader.put("apikey", "2023_Shinhan_SSAFY_Hackathon");

        Map<String, String> dataBody = new HashMap<>();
        dataBody.put("제휴고객번호", userNumber);
        dataBody.put("발송메시지", username);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("dataHeader", dataHeader);
        requestBody.put("dataBody", dataBody);

        String url = "https://shbhack.shinhan.com/v1/notice/sol-push";

        // RestTemplate 사용
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<SOLPushNotificationResponse> response =
                restTemplate.postForEntity(url, entity, SOLPushNotificationResponse.class);

        return response.getBody();
    }
}
