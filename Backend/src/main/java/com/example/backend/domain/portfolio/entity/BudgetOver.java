package com.example.backend.domain.portfolio.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BudgetOver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long overId;

    private LocalDate date;
    private Long budgetOver;
}
