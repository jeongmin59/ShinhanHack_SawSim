package com.example.backend.domain.budget.repository;

import com.example.backend.domain.budget.dto.BudgetSaveDto;
import com.example.backend.domain.budget.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Budget save(BudgetSaveDto budgetSaveDto);
    Optional<Budget> findByTravel_dateAndCategory(LocalDateTime travel_date, String category);
    List<Budget> findAllByPlan_id(Long plan_id);
}
