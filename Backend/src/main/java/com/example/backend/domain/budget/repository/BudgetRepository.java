package com.example.backend.domain.budget.repository;


import com.example.backend.domain.budget.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByTravelDateAndCategory(LocalDate travelDate, String category);
    List<Budget> findAllByPlanId(Long planId);

    // 여행 포트폴리오 예산 조회할 때 사용
    List<Budget> findAllByTravelDate(LocalDate travelDate);

}
