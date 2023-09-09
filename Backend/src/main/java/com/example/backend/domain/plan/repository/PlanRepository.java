package com.example.backend.domain.plan.repository;

import com.example.backend.domain.plan.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    Optional<List<Plan>> findAllByAccountId(Long accountId);

    @Query("select p from Plan p where :today between p.startDate and p.endDate")
    List<Plan> findByDate(LocalDate today);
}
