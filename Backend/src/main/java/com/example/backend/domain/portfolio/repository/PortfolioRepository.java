package com.example.backend.domain.portfolio.repository;

import com.example.backend.domain.portfolio.entity.BudgetOver;
import com.example.backend.domain.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
}
