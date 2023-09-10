package com.example.backend.domain.plan.entity;

import com.example.backend.domain.account.Account;
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
@Table(name = "PLAN")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PLAN_ID")
    private Long id;

    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;
}
