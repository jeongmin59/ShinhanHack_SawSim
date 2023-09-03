package com.example.backend.domain.portfolio.dto;

import com.example.backend.domain.budget.dto.BudgetSaveRequestDto;
import lombok.Getter;

@Getter
public class PortfolioRequestDto {
    private BudgetSaveRequestDto.DataBody dataBody;

    @Getter
    public static class DataBody {
        private Long planId;
        private Long accountId;
    }
}
