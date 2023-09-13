package com.example.backend.domain.portfolio.dto;


import com.example.backend.domain.plan.entity.Plan;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder(toBuilder = true)
public class PortfolioListGetResponseDto {
    private List<PlanInfo> planList;

    @Getter
    @Builder(toBuilder = true)
    public static class PlanInfo {
        private Long id;
        private LocalDate startDate;
        private LocalDate endDate;
    }
}
