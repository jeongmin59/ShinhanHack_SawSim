package com.example.backend.domain.portfolio.repository;

import com.example.backend.domain.portfolio.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findAllByPlanId(Long planId);
}
