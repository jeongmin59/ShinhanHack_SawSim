package com.example.backend.domain.plan.repository;

import com.example.backend.domain.plan.dto.BudgetSaveDto;
import com.example.backend.domain.plan.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Budget save(BudgetSaveDto budgetSaveDto);
}
