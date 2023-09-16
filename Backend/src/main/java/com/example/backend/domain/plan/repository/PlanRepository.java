package com.example.backend.domain.plan.repository;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.plan.entity.Plan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findAllByAccountId(Long accountId);

    Optional<Plan> findByAccountAndId(Account account, Long id);

    @Query("select p from Plan p left join fetch p.account where :today between p.startDate and p.endDate")
    List<Plan> findByDate(LocalDate today);

    @Query("select p from Plan p where p.account = :account and p.endDate >= :today order by p.startDate")
    Page<Plan> findNotEndPlan(@Param("account") Account account, @Param("today") LocalDate today, Pageable pageable);
}
