package com.example.backend.domain.plan.entity;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.common.BaseEntity;
import com.example.backend.domain.portfolio.entity.Portfolio;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PLAN")
public class Plan extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PLAN_ID")
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Budget> budgetList;

    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Portfolio> portfolioList;

}
