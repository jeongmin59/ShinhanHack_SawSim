package com.example.backend.domain.plan.repository;

import com.example.backend.domain.plan.dto.BudgetSaveDto;
import com.example.backend.domain.plan.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Budget save(BudgetSaveDto budgetSaveDto);
    Budget findByTravel_dateAndCategory(LocalDateTime travel_date, String category);
}
