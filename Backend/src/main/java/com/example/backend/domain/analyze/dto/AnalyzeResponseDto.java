package com.example.backend.domain.analyze.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
public class AnalyzeResponseDto {
    private DataBody dataBody;

    @Getter
    @Builder(toBuilder = true)
    public static class DataBody {

        private Long day;
        private Long totalBudget;
        private Integer amountUsed;

        @JsonProperty("음식점")
        private Long meal;
        @JsonProperty("교통,수송")
        private Long traffic;
        @JsonProperty("스포츠,레저")
        private Long sports;
        @JsonProperty("여행")
        private Long travel;
        @JsonProperty("의료,건강")
        private Long medical;
        @JsonProperty("기타")
        private Long etc;

    }
}
