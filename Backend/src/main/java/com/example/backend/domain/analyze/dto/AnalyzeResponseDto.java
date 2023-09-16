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
        private Integer dayAmount; // 일자별 예산
        private Integer dayAmountUsed; //일자별 사용액

        @JsonProperty("음식점")
        private Double dayMeal;
        @JsonProperty("교통,수송")
        private Double dayTraffic;
        @JsonProperty("스포츠,레저")
        private Double daySports;
        @JsonProperty("관광지")
        private Double dayTravel;
        @JsonProperty("숙박")
        private Double dayLodge;
        @JsonProperty("기타")
        private Double dayEtc;

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


//        private Category dayCategory; //왼쪽 그래프 일차별 카테고리 분석
//        private Category totalCategory;//오른쪽 그래프 일차별 카테고리 분석
//
//        @Builder(toBuilder = true)
//        public static class Category{
//            @JsonProperty("음식점")
//            private Double meal;
//            @JsonProperty("교통,수송")
//            private Double traffic;
//            @JsonProperty("스포츠,레저")
//            private Double sports;
//            @JsonProperty("관광지")
//            private Double travel;
//            @JsonProperty("숙박")
//            private Double lodge;
//            @JsonProperty("기타")
//            private Double etc;
//        }
    }
}
