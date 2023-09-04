package com.example.backend.domain.plan.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class PlanDetailResponse {
    private Long accountId;
    private LocalDate startDate;
    private LocalDate endDate;
}
