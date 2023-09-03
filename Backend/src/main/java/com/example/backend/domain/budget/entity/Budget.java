package com.example.backend.domain.budget.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "BUDGET")
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long budgetId;

    //@Column(name = "plan_id")
    private Long planId;

    //@Column(name = "category")
    private String category;

   // @Column(name = "amount")
    private Long amount;

    //@Column(name = "travel_date")
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate travelDate;

    public void setAmount(Long amount){
        this.amount=amount;
    }
}
