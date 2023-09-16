package com.example.backend.domain.portfolio.entity;

import com.example.backend.domain.common.BaseEntity;
import com.example.backend.domain.plan.entity.Plan;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Portfolio extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PORTFOLIO_ID")
    private Long id;
    private Long totalBudget;
    private Long totalPayment;
    private LocalDate travelDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;

    public static Portfolio createPortfolio(Long totalBudget, Long totalPayment, LocalDate travelDate, Plan plan) {
        Portfolio portfolio = new Portfolio();
        portfolio.totalBudget = totalBudget;
        portfolio.totalPayment = totalPayment;
        portfolio.travelDate = travelDate;
        portfolio.plan = plan;
        return portfolio;
    }
}
