package com.example.backend.domain.plan.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class PlanGetResponseDto {
    private Long planId;

    @JsonFormat(pattern = "yyyyMMdd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyyMMdd")
    private LocalDate endDate;
}
