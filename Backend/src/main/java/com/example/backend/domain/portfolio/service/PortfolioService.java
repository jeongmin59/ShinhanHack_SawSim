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
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
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

// 여행 DB 저장
    public void portfolioSave(String userNumber, Long planId) {
        /**
         * 예산(portfolio) 저장
         */
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

                portfolios.add(Portfolio.createPortfolio(totalBudgetOnTargetDate, totalPaymentOnTargetDate, targetDate,plan));
            }
            portfolioRepository.saveAll(portfolios);
        }


        /**
         * 맵(transaction_history) 저장
         */
        for (Portfolio findPortfolio : findPortfolios) {
            //List<TransactionHistory> transactionHistories = transactionRepository.findByTransactionDate(findPortfolio.getTravelDate());
            // 처음 조회라면 저장이 필요하다.
            //if (transactionHistories.isEmpty()) {
                List<Payment> payments = paymentRepository.findByAccountAndTransactionDate(account, findPortfolio.getTravelDate());

                List<TransactionHistory> transactionHistoryList = new ArrayList<>();
                for (Payment payment : payments) {
                    Mono<KakaoPlaceSearchResponseDto> location = findLocation(payment.getStoreName());
                    KakaoPlaceSearchResponseDto responseDto = location.block(); // Mono의 결과를 동기적으로 가져옴

                    if (responseDto != null && !responseDto.getDocuments().isEmpty()) {
                        Double latitude = Double.valueOf(responseDto.getDocuments().get(0).getY()); // 첫 번째 결과의 위도 정보 가져오기
                        Double longitude = Double.valueOf(responseDto.getDocuments().get(0).getX()); // 첫 번째 결과의 경도 정보 가져오기

                        transactionHistoryList.add(TransactionHistory.create(payment.getAmount(), payment.getStoreName(), latitude, longitude, payment.getTransactionDate(), payment.getTransactionTime(), findPortfolio));
                    }
                }
                transactionRepository.saveAll(transactionHistoryList);
           // }
        }
    }


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
        List<Portfolio> findPortfolios = portfolioRepository.findAllByPlanId(planId);

        // 해당 plan의 값을 가져와서 모두 더한다. 총 예산, 총 사용금액
        Long totalBudget = findPortfolios.stream()
                .mapToLong(portfolio -> {
                    Long budget = portfolio.getTotalBudget();
                    return budget != null ? budget : 0L;
                })
                .sum();

        Long totalPayment = findPortfolios.stream()
                .mapToLong(portfolio -> {
                    Long payment = portfolio.getTotalPayment();
                    return payment != null ? payment : 0L;
                })
                .sum();

        List<LocalDate> deficitDates = findPortfolios.stream()
                .filter(portfolio -> {
                    Long budget = portfolio.getTotalBudget();
                    Long payment = portfolio.getTotalPayment();
                    return budget != null && payment != null && budget - payment < 0;
                })
                .map(Portfolio::getTravelDate)
                .collect(Collectors.toList());

        return PortfolioResponseDto.builder()
                .dataBody(PortfolioResponseDto.DataBody.builder()
                        .totalBudget(totalBudget)
                        .amount(totalBudget - totalPayment)
                        .budgetOvers(deficitDates)
                        .build())
                .build();
    }

    // 0. 해당 일자의 지도 내역이 없다면?
    // 1. 결제내역에서 해당 일자의 결제내역을 가져온다.
    // 2. 가게명을 검색하여 위도와 경도를 저장한다.
    // 3. 전체 내역을 보여준다.
    // 있다면? 그냥 전체 내역을 보여준다.
    public PortfolioMapResponseDto portfolioMapGet(String userNumber, Long planId) {
        /**
         * 1. planId에 해당하느 포트폴리오 값을 전부 받아온다.
         * 2. Id에 해당하는 transaction_history값을 받아온다
         * 3. 그 값들을 리스트에 담아서 출력해준다.
         */

        List<Portfolio> findPortfolios = portfolioRepository.findAllByPlanId(planId);
        List<PortfolioMapResponseDto.DataBody.travelInfo> travelInfoList = new ArrayList<>();

        for (Portfolio findPortfolio : findPortfolios) {
            List<TransactionHistory> transactionHistories = transactionRepository.findByTransactionDate(findPortfolio.getTravelDate());

            for (TransactionHistory transactionHistory : transactionHistories) {
                PortfolioMapResponseDto.DataBody.travelInfo travelInfo = PortfolioMapResponseDto.DataBody.travelInfo.builder()
                        .amount(transactionHistory.getAmount())
                        .storeName(transactionHistory.getStoreName())
                        .latitude(transactionHistory.getLatitude())
                        .longitude(transactionHistory.getLongitude())
                        .transactionDate(transactionHistory.getTransactionDate())
                        .transactionTime(transactionHistory.getTransactionTime())
                        .build();
                travelInfoList.add(travelInfo);
            }

        }
        PortfolioMapResponseDto.DataBody dataBody = PortfolioMapResponseDto.DataBody.builder()
                .travelInfoList(travelInfoList)
                .build();

        return PortfolioMapResponseDto.builder()
                .dataBody(dataBody)
                .build();
    }

    public PortfolioListGetResponseDto portfolioListGet(String userNumber) {
        Account account = accountRepository.findAccountByUserNumber(userNumber)
                .orElseThrow(UserNotFoundException::new);

        List<Plan> planList = planRepository.findAllByAccountId(account.getId()).orElse(Collections.emptyList());

        List<PortfolioListGetResponseDto.PlanInfo> planInfoList = planList.stream()
                .filter(plan -> !plan.getPortfolioList().isEmpty()) // 포트폴리오가 있는지 확인
                .map(plan -> PortfolioListGetResponseDto.PlanInfo.builder()
                        .id(plan.getId())
                        .startDate(plan.getStartDate())
                        .endDate(plan.getEndDate())
                        .build())
                .collect(Collectors.toList());

        return PortfolioListGetResponseDto.builder()
                .planList(planInfoList)
                .build();
    }




    // userNumber로 계좌내역조회 받아오는 메서드
    public ShinhanTransactionRequestDto transactionHistoryInquiry(String accountNumber) {
        ShinhanTransactionResponseDto shinhanTransactionResponseDto = ShinhanTransactionResponseDto.builder()
                .dataHeader(ShinhanTransactionResponseDto.DataHeader.builder().apikey("2023_Shinhan_SSAFY_Hackathon").build())
                .dataBody(ShinhanTransactionResponseDto.DataBody.builder().accountNumber(accountNumber).build())
                .build();


        //신한 거래내역조회 api 요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://shbhack.shinhan.com")
                .build();

        return webClient
                .post()
                .uri("v1/search/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(shinhanTransactionResponseDto)
                .retrieve()
                .bodyToMono(ShinhanTransactionRequestDto.class)
                .block();
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
