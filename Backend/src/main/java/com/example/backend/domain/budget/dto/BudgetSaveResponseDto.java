package com.example.backend.domain.budget.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class BudgetSaveResponseDto {
    private Long planId;
    private String category;
    private Long amount;
    private LocalDate travelDate;

}
