package com.example.backend.domain.portfolio.repository;

import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.portfolio.entity.BudgetOver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetOverRepository extends JpaRepository<BudgetOver, Long> {
}
