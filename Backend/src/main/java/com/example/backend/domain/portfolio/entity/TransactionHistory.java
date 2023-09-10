package com.example.backend.domain.portfolio.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

import static javax.persistence.FetchType.LAZY;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class TransactionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRANSACTION_HISTORY_ID")
    private Long id;

    private LocalDate date;
    private String store;
    private Long cost;
    private Double latitude;
    private Double longitude;
    private LocalTime time;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PORTFOLIO_ID")
    private Portfolio portfolio;

}
