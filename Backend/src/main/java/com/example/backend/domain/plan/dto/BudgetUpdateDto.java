package com.example.backend.domain.plan.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class BudgetUpdateDto {
    private Long plan_id;
    private String category;
    private Long amount;
    private LocalDateTime travel_date;
}
