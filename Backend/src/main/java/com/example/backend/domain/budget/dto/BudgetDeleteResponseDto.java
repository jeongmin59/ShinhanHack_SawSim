package com.example.backend.domain.budget.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class BudgetDeleteResponseDto {
    private String category;
    private LocalDate travelDate;
}
