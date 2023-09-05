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
        private String totalBudget;
        private String amount;
        private List<LocalDate> budgetOvers;

        @Getter
        @Builder(toBuilder = true)
        public static class budgetOver {
            private LocalDate date;
        }
    }
}
