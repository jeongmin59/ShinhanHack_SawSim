package com.example.backend.domain.payment;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Payment extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "PAYMENT_ID")
    private Long id;

    private String content;
    private Long amount;
    private String storeName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate transactionDate;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime transactionTime;
    private PaymentType paymentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    public static Payment createPayment(String content, Long amount, String storeName, LocalDate transactionDate, LocalTime transactionTime, PaymentType paymentType, Account account) {
        Payment payment = new Payment();
        payment.content = content;
        payment.amount = amount;
        payment.storeName = storeName;
        payment.transactionDate = transactionDate;
        payment.transactionTime = transactionTime;
        payment.paymentType = paymentType;
        payment.account = account;

        return payment;
    }
}
