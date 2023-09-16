package com.example.backend.domain.budget.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class BudgetDeleteResponseDto {
    private String category;
    @JsonFormat(pattern = "yyyyMMdd")
    private LocalDate travelDate;
}
