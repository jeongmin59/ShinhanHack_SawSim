package com.example.backend.domain.plan.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class PlanSaveRequestDto {
    private DataBody dataBody;

    @Getter
    public static class DataBody {
        private LocalDate start_date;
        private LocalDate end_date;
    }

}
