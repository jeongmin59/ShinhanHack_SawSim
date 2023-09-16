package com.example.backend.domain.plan.exception;

public class PlanNotFoundException extends RuntimeException {
    public PlanNotFoundException() {
        super("예정되어있거나 진행중인 여행계획이 없습니다.");
    }
}
