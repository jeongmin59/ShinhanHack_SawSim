package com.example.backend.domain.portfolio.service;

import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.entity.Plan;
import com.example.backend.domain.budget.repository.BudgetRepository;
import com.example.backend.domain.portfolio.dto.PortfolioRequestDto;
import com.example.backend.domain.portfolio.entity.Portfolio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final BudgetRepository budgetRepository;
    private final PlanRepository planRepository;

    public void portfolioBudgetGet(PortfolioRequestDto portfolioRequestDto,Long plan_id) {
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
        List<Budget> budgetList = budgetRepository.findAllByPlanId(plan_id);
        Plan plan = planRepository.findById(plan_id);
        //날짜 차이 계산
        Period period = Period.between(plan.getStart_date(),plan.getEnd_date());
        int day = period.getDays();

        int budget_total=0; // 예산 총합
        int expenditure_total=0; // 지출 총합

        List<LocalDate> budgetOver = new ArrayList<>(); //금액 초과

        for(int i=0;i<day;i++){
            //해당 일차 예산 총합 구하기
            List<Budget> budgets = budgetRepository.findAllByTravelDate(plan.getStart_date().plusDays(i));
            int budget_cost = 0; // 예산

            for (Budget budget : budgets) {
                budget_cost += budget.getAmount();
            }

            //신한 API에서 해당 거래 내역 일차별 총합
            int expenditure_cost = 0; // 지출

            //logic


            // 금액 초과 일자 구하기
            if((budget_cost-expenditure_cost)<0){
                budgetOver.add(plan.getStart_date().plusDays(i));
            }

            // total 더하기
            budget_total+=budget_cost;
            expenditure_total+=expenditure_cost;
        }

        long totalBudget = new Double((double)expenditure_total/ (double)budget_total * 100.0).longValue();
        long amount_used = budget_total-expenditure_total;
        // 여행 포트폴리오
        Portfolio portfolio = new Portfolio(
                null,
                plan_id,
                totalBudget,
                amount_used
        );
    }


}
