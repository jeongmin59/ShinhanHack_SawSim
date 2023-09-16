package com.example.backend.domain.portfolio.entity;

import com.example.backend.domain.common.BaseEntity;
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
public class TransactionHistory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRANSACTION_HISTORY_ID")
    private Long id;

    private Long amount;
    private String storeName;
    private Double latitude;
    private Double longitude;
    private LocalDate transactionDate;
    private LocalTime transactionTime;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "PORTFOLIO_ID")
    private Portfolio portfolio;

    public static TransactionHistory create(Long amount, String storeName, Double latitude, Double longitude, LocalDate transactionDate, LocalTime transactionTime, Portfolio portfolio) {
        TransactionHistory transactionHistory = new TransactionHistory();
        transactionHistory.amount = amount;
        transactionHistory.storeName = storeName;
        transactionHistory.latitude = latitude;
        transactionHistory.longitude = longitude;
        transactionHistory.transactionDate = transactionDate;
        transactionHistory.transactionTime = transactionTime;
        transactionHistory.portfolio = portfolio;

        return transactionHistory;
    }

}
