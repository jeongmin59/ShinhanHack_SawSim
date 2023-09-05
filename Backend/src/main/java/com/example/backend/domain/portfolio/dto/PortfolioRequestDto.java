package com.example.backend.domain.portfolio.dto;

import lombok.Getter;

@Getter
public class PortfolioRequestDto {
    private DataBody dataBody;
    private String userNumber;

    @Getter
    public static class DataBody {
        private Long planId;
        private Long accountId;
    }

}
