package com.example.backend.domain.portfolio.service;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.repository.BudgetRepository;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.repository.PlanRepository;
import com.example.backend.domain.portfolio.dto.PortfolioResponseDto;
import com.example.backend.domain.portfolio.dto.ShinhanTransactionRequestDto;
import com.example.backend.domain.portfolio.dto.ShinhanTransactionResponseDto;
import com.example.backend.domain.portfolio.entity.Portfolio;
import com.example.backend.domain.portfolio.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final BudgetRepository budgetRepository;
    private final PlanRepository planRepository;
    private final AccountRepository accountRepository;
    private final PortfolioRepository portfolioRepository;


    public PortfolioResponseDto portfolioBudgetGet(String userNumber ,Long plan_id) {
        // 여행 예산 조회
        // 1. 전체 예산 사용 퍼센트
        // 2. 사용 금액
        // 3. 예산 초과 날짜

        // 내 여행 예산 값과 실제 신한 API 거래 내역을 비교
            // 내 여행 예산 일차 별로 총합 구하기
            // 신한 API에서 해당 거래 내역 일차별로 총합 구하기
                // 3. 예산 초과 날짜 구하고 저장
                // 일차별 총합을 모두 더 하고 저장 2. 사용 금액 구함
                // 총합 값에 비교하여 비율을 구하면 1. 전체 예산 사용 퍼센트 구함

        Optional<Plan> plan = planRepository.findById(plan_id);

        if(plan.isEmpty()){
            return null;
        }

        //날짜 차이 계산
        Period period = Period.between(plan.get().getStartDate(),plan.get().getEndDate());
        int day = period.getDays();

        int budget_total=0; // 예산 총합
        int expenditure_total=0; // 지출 총합

        List<LocalDate> budgetOver = new ArrayList<>(); //금액 초과

        //신한  계좌 거래내역 조회
        Account account = accountRepository.findAccountByUserNumber(userNumber)
                .orElseThrow(() -> new IllegalArgumentException("올바른 유저가 아닙니다."));


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

        for(int i=0;i<day;i++){
            //해당 일차 예산 총합 구하기
            List<Budget> budgets = budgetRepository.findAllByTravelDate(plan.get().getStartDate().plusDays(i));
            int budget_cost = 0; // 예산

            for (Budget budget : budgets) {
                budget_cost += budget.getAmount();
            }

            //신한 API에서 해당 거래 내역 일차별 총합
            int expenditure_cost = 0; // 지출


            //logic
            for(ShinhanTransactionRequestDto.DataBody.TransactionHistory transactionHistory : shinhanTransactionRequestDto.getDataBody().getTransactions()){
                // 날짜 비교를 위한 LocalDate 타입 변경
                LocalDate date = LocalDate.parse(transactionHistory.getTransactionDate(), DateTimeFormatter.BASIC_ISO_DATE);

                // 날짜가 같으면 해당 날짜에 지출이 있다는 것
                if(date.equals(plan.get().getStartDate().plusDays(i))){
                    expenditure_cost+= Integer.parseInt(transactionHistory.getWithdrawalAmount());
                }
            }


            // 금액 초과 일자 구하기
            if((budget_cost-expenditure_cost)<0){
                budgetOver.add(plan.get().getStartDate().plusDays(i));
            }

            // total 더하기
            budget_total+=budget_cost;
            expenditure_total+=expenditure_cost;
        }

        long totalBudget = new Double((double)expenditure_total/ (double)budget_total * 100.0).longValue();
        long consumptionAmount = budget_total-expenditure_total;
        // 여행 포트폴리오 저장
        Portfolio portfolio = new Portfolio(
                null,
                plan_id,
                totalBudget,
                consumptionAmount
        );

        portfolioRepository.save(portfolio);

        PortfolioResponseDto portfolioResponseDto = PortfolioResponseDto.builder()
                .dataBody(PortfolioResponseDto.DataBody.builder().totalBudget(String.valueOf(totalBudget)).build())
                .dataBody(PortfolioResponseDto.DataBody.builder().amount(String.valueOf(consumptionAmount)).build())
                .dataBody(PortfolioResponseDto.DataBody.builder().budgetOvers(budgetOver).build())
                .build();

        return portfolioResponseDto;
    }


}
