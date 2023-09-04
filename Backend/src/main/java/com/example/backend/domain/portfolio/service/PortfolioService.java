package com.example.backend.domain.portfolio.service;

import com.example.backend.domain.budget.repository.BudgetRepository;
import com.example.backend.domain.portfolio.dto.PortfolioRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final BudgetRepository budgetRepository;

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



    }
}
