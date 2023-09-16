package com.example.backend.domain.budget.entity;

import com.example.backend.domain.common.BaseEntity;
import com.example.backend.domain.plan.entity.Plan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BUDGET")
public class Budget extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BUDGET_ID")
    private Long budgetId;

    private String category;
    private Long amount;
    private LocalDate travelDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
