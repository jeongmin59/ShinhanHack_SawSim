package com.example.backend.domain.budget.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BudgetUpdateRequestDto {
    private BudgetSaveRequestDto.DataBody dataBody;

    @Getter
    public static class DataBody {
        private String category;
        private Long amount;
        private LocalDate travelDate;
    }
}
