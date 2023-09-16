package com.example.backend.domain.budget.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class BudgetGetResponseDto {
    private Long budgetId;
    private String category;
    private Long amount;
    private LocalDate travelDate;
}
