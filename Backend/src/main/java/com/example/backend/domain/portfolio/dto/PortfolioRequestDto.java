package com.example.backend.domain.portfolio.dto;

import lombok.Getter;

@Getter
public class PortfolioRequestDto {
    private DataBody dataBody;

    @Getter
    public static class DataBody {
        private Long accountId;
    }

}
