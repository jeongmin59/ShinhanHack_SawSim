package com.example.backend.domain.portfolio.service;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.exception.UserNotFoundException;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.repository.BudgetRepository;
import com.example.backend.domain.common.exception.ResourceNotFoundException;
import com.example.backend.domain.payment.Payment;
import com.example.backend.domain.payment.repository.PaymentRepository;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.repository.PlanRepository;
import com.example.backend.domain.portfolio.dto.*;
import com.example.backend.domain.portfolio.entity.Portfolio;
import com.example.backend.domain.portfolio.entity.TransactionHistory;
import com.example.backend.domain.portfolio.repository.PortfolioRepository;
import com.example.backend.domain.portfolio.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final BudgetRepository budgetRepository;
    private final PlanRepository planRepository;
    private final AccountRepository accountRepository;
    private final PortfolioRepository portfolioRepository;
    private final TransactionRepository transactionRepository;
    private final PaymentRepository paymentRepository;

// 여행 예산 조회
    // 1. 전체 예산 사용 퍼센트 -> 해당 일 예산 총합, 결제내역 사용금액 총합으로 계산
    // 2. 사용 금액 -> 결재내역 사용금액 총합
    // 3. 예산 초과 날짜 -> 해당 일 예산 총합 - 결재내역 사용금액 총합

    // 내 여행 예산 값과 실제 신한 API 거래 내역을 비교
    // 내 여행 예산 일차 별로 총합 구하기
    // 신한 API에서 해당 거래 내역 일차별로 총합 구하기
    // 3. 예산 초과 날짜 구하고 저장
    // 일차별 총합을 모두 더 하고 저장 2. 사용 금액 구함
    // 총합 값에 비교하여 비율을 구하면 1. 전체 예산 사용 퍼센트 구함
    public PortfolioResponseDto portfolioBudgetGet(String userNumber, Long planId) {

        Account account = accountRepository.findAccountByUserNumber(userNumber)
                .orElseThrow(UserNotFoundException::new);

        Plan plan = planRepository.findByAccountAndId(account, planId)
                .orElseThrow(() -> new ResourceNotFoundException("Plan", planId));

        List<Portfolio> findPortfolios = portfolioRepository.findAllByPlanId(planId);

        if (findPortfolios.isEmpty()) {
            //날짜 차이 계산
            long day = ChronoUnit.DAYS.between(plan.getStartDate(), plan.getEndDate());

            List<Portfolio> portfolios = new ArrayList<>();
            for (int i = 0; i < day; i++) {
                LocalDate targetDate = plan.getStartDate().plusDays(i);

                Long totalBudgetOnTargetDate = budgetRepository.findAllByPlanAndTravelDate(plan, targetDate).stream()
                        .mapToLong(Budget::getAmount)
                        .sum();
                Long totalPaymentOnTargetDate = paymentRepository.findByAccountAndTransactionDate(plan.getAccount(), targetDate).stream()
                        .mapToLong(Payment::getAmount)
                        .sum();

                portfolios.add(Portfolio.createPortfolio(totalBudgetOnTargetDate, totalPaymentOnTargetDate, targetDate));
            }
            portfolioRepository.saveAll(portfolios);

            findPortfolios = portfolioRepository.findAllByPlanId(planId);
        }

        // 해당 plan의 값을 가져와서 모두 더한다. 총 예산, 총 사용금액
        Long totalBudget = findPortfolios.stream()
                .mapToLong(Portfolio::getTotalBudget)
                .sum();
        Long totalPayment = findPortfolios.stream()
                .mapToLong(Portfolio::getTotalPayment)
                .sum();
        List<LocalDate> deficitDates = findPortfolios.stream()
                .filter(portfolio -> portfolio.getTotalBudget() - portfolio.getTotalPayment() < 0)
                .map(Portfolio::getTravelDate)
                .collect(Collectors.toList());

        return PortfolioResponseDto.builder()
                .dataBody(PortfolioResponseDto.DataBody.builder()
                        .totalBudget(totalBudget)
                        .amount(totalBudget - totalPayment)
                        .budgetOvers(deficitDates)
                        .build())
                .build();


//        int budget_total = 0; // 예산 총합
//        int expenditure_total = 0; // 지출 총합
//
//        List<LocalDate> budgetOver = new ArrayList<>(); //금액 초과
//
//        //신한  계좌 거래내역 조회
//        ShinhanTransactionRequestDto shinhanTransactionRequestDto = transactionHistoryInquiry(userNumber);
//
//        //날짜 반복
//        for (int i = 0; i < day; i++) {
//            //해당 일차 예산 총합 구하기
//            List<Budget> budgets = budgetRepository.findAllByTravelDate(plan.getStartDate().plusDays(i));
//            int budget_cost = 0; // 예산
//
//            for (Budget budget : budgets) {
//                budget_cost += budget.getAmount();
//            }
//
//            //신한 API에서 해당 거래 내역 일차별 총합
//            int expenditure_cost = 0; // 지출
//
//
//            //logic
//            for (ShinhanTransactionRequestDto.DataBody.TransactionHistory transactionHistory : shinhanTransactionRequestDto.getDataBody().getTransactions()) {
//                // 날짜 비교를 위한 LocalDate 타입 변경
//                LocalDate date = LocalDate.parse(transactionHistory.getTransactionDate(), DateTimeFormatter.BASIC_ISO_DATE);
//
//                // 날짜가 같으면 해당 날짜에 지출이 있다는 것
//                if (date.equals(plan.getStartDate().plusDays(i))) {
//                    expenditure_cost += Integer.parseInt(transactionHistory.getWithdrawalAmount());
//                }
//            }
//
//
//            // 금액 초과 일자 구하기
//            if ((budget_cost - expenditure_cost) < 0) {
//                budgetOver.add(plan.getStartDate().plusDays(i));
//                BudgetOver budget = new BudgetOver(
//                        null,
//                        plan.getStartDate().plusDays(i),
//                        (long) (budget_cost - expenditure_cost),
//                        null
//                );
//
//                budgetOverRepository.save(budget);
//            }
//
//            // total 더하기
//            budget_total += budget_cost;
//            expenditure_total += expenditure_cost;
//        }
//
//        long totalBudget = (long) ((double) expenditure_total / budget_total);
//        long consumptionAmount = budget_total - expenditure_total;
//        // 여행 포트폴리오 저장
//        Portfolio portfolio = new Portfolio(
//                null,
//                totalBudget,
//                consumptionAmount,
//                plan
//        );
//
//        portfolioRepository.save(portfolio);


    }


    public PortfolioMapResponseDto portfolioMapGet(String userNumber, Long planId) {
        // 1. 신한 계좌 거래내역 조회를 통해서 거래 내역을 받아온다.
        // 2. planId를 통해서 여행 계획 정보를 받아와서 시작 날짜와 끝나는 날짜를 받아온다.
        // 3. (for문) 시작 날짜부터 끝나는 날짜에 출금 금액이 있는 정보를 받아온다.
        // 4. 해당 정보에서 "내용"에 해당하는 부분에서 상호명 검색을 통해 "위도", "경도" 정보를 받아온다.
        // 5. 해당 정보(날짜, 상호명, 가격, 위도, 경도, 시간)를 리스트(dto)에 저장하고 리턴해준다.

        //1.
        ShinhanTransactionRequestDto shinhanTransactionRequestDto = transactionHistoryInquiry(userNumber);

        //2
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new ResourceNotFoundException("Plan", planId));

        //3.

        // 내역 조회 리스트
        List<PortfolioMapResponseDto.DataBody.travelInfo> travelInfoList = new ArrayList<>();

        // 내역 조회 반복
        for (ShinhanTransactionRequestDto.DataBody.TransactionHistory transactionHistory : shinhanTransactionRequestDto.getDataBody().getTransactions()) {
            // 날짜 비교를 위한 LocalDate 타입 변경
            LocalDate date = LocalDate.parse(transactionHistory.getTransactionDate(), DateTimeFormatter.BASIC_ISO_DATE);

            // 여행 날짜에 포함되는 거래 내역이고
            // 출금 금액이 있으면 저장

            if (!plan.getStartDate().isAfter(date) && !plan.getEndDate().isBefore(date)
                    && Integer.parseInt(transactionHistory.getWithdrawalAmount()) > 0) {

                //4. 위도 경도 받아오는 api 사용
                Mono<KakaoPlaceSearchResponseDto> location = findLocation(transactionHistory.getDetail());
                KakaoPlaceSearchResponseDto responseDto = location.block(); // Mono의 결과를 동기적으로 가져옴

                if (responseDto != null && !responseDto.getDocuments().isEmpty()) {
                    String latitude = responseDto.getDocuments().get(0).getY(); // 첫 번째 결과의 위도 정보 가져오기
                    String longitude = responseDto.getDocuments().get(0).getX(); // 첫 번째 결과의 경도 정보 가져오기

                    //5.
                    PortfolioMapResponseDto.DataBody.travelInfo travelInfo = PortfolioMapResponseDto.DataBody.travelInfo.builder()
                            .date(date)
                            .store(transactionHistory.getDetail())
                            .cost(transactionHistory.getWithdrawalAmount())
                            .latitude(latitude)
                            .longitude(longitude)
                            .time(transactionHistory.getTransactionTime())
                            .build();

                    travelInfoList.add(travelInfo);

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmmss");
                    LocalTime parsedTime = LocalTime.parse(transactionHistory.getTransactionTime(), formatter);

                    TransactionHistory transaction = new TransactionHistory(
                            null,
                            date,
                            transactionHistory.getDetail(),
                            Long.parseLong(transactionHistory.getWithdrawalAmount()),
                            Double.parseDouble(latitude),
                            Double.parseDouble(longitude),
                            parsedTime,
                            null
                    );
                    transactionRepository.save(transaction);
                }
            }
        }

        PortfolioMapResponseDto.DataBody dataBody = PortfolioMapResponseDto.DataBody.builder()
                .travelInfoList(travelInfoList)
                .build();

        return PortfolioMapResponseDto.builder()
                .dataBody(dataBody)
                .build();

    }

    // userNumber로 계좌내역조회 받아오는 메서드
    public ShinhanTransactionRequestDto transactionHistoryInquiry(String userNumber) {
        Account account = accountRepository.findAccountByUserNumber(userNumber)
                .orElseThrow(UserNotFoundException::new);

        ShinhanTransactionResponseDto shinhanTransactionResponseDto = ShinhanTransactionResponseDto.builder()
                .dataHeader(ShinhanTransactionResponseDto.DataHeader.builder().apikey("2023_Shinhan_SSAFY_Hackathon").build())
                .dataBody(ShinhanTransactionResponseDto.DataBody.builder().accountNumber(account.getNumber()).build())
                .build();


        //신한 거래내역조회 api 요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://shbhack.shinhan.com")
                .build();


        ShinhanTransactionRequestDto shinhanTransactionRequestDto =
                webClient
                        .post()
                        .uri("v1/search/transaction")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(shinhanTransactionResponseDto)
                        .retrieve()
                        .bodyToMono(ShinhanTransactionRequestDto.class)
                        .block();

        return shinhanTransactionRequestDto;
    }

    // 신한 거래내역 조회에서 내용 부분으로 위도 경도를 찾는 api

    /**
     * 0번째 인덱스를 출력하게 함 따로 조건 설정이 필요
     */
    public Mono<KakaoPlaceSearchResponseDto> findLocation(String detail) {
        String kakaoApiKey = "db1d7f023e9f1fbe3ba4df2e0c1228f6";

        WebClient webClient = WebClient.builder()
                .baseUrl("https://dapi.kakao.com/v2/local/search/keyword.json")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "KakaoAK " + kakaoApiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        return webClient.get()
                .uri(uriBuilder -> uriBuilder.queryParam("query", detail).build())
                .retrieve()
                .bodyToMono(KakaoPlaceSearchResponseDto.class);

    }


}
