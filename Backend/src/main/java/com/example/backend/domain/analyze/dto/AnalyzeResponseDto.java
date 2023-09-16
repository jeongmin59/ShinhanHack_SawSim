package com.example.backend.domain.analyze.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class AnalyzeResponseDto {
    private DataBody dataBody;

    @Getter
    @Builder(toBuilder = true)
    public static class DataBody {

        private Long day;
        private Double totalBudget;
        private Integer amountUsed;

        @JsonProperty("음식점")
        private Double meal;
        @JsonProperty("교통,수송")
        private Double traffic;
        @JsonProperty("스포츠,레저")
        private Double sports;
        @JsonProperty("관광지")
        private Double travel;
        @JsonProperty("숙박")
        private Double lodge;
        @JsonProperty("기타")
        private Double etc;

    }
}
