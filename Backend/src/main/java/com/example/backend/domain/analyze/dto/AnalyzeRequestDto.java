package com.example.backend.domain.analyze.dto;

import lombok.Getter;

@Getter
public class AnalyzeRequestDto {
    private DataBody dataBody;

    @Getter
    public static class DataBody {
        private String todayDate;
    }
}
