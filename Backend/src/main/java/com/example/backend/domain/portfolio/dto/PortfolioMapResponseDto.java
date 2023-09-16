package com.example.backend.domain.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Builder(toBuilder = true)
public class PortfolioMapResponseDto {
    private DataBody dataBody;

    @Getter
    @Builder(toBuilder = true)
    public static class DataBody {
        private List<travelInfo> travelInfoList;

        @Getter
        @Builder(toBuilder = true)
        public static class travelInfo {
            private Long amount;
            private String storeName;
            private Double latitude;
            private Double longitude;
            @JsonFormat(pattern = "yyyyMMdd")
            private LocalDate transactionDate;
            @JsonFormat(pattern = "HHmmss")
            private LocalTime transactionTime;
        }
    }

}
