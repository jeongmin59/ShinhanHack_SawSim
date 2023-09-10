package com.example.backend.domain.portfolio.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder(toBuilder = true)
public class PortfolioResponseDto {
    private DataBody dataBody;

    @Getter
    @Builder(toBuilder = true)
    public static class DataBody {

        private Long totalBudget; // 여행 총 예산
        private Long amount; // 예산 -  사용 금액
        private List<LocalDate> budgetOvers; // 예산을 초과한 날
    }
}
