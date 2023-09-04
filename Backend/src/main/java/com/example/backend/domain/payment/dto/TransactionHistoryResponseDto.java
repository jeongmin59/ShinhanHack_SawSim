package com.example.backend.domain.payment.dto;

import com.example.backend.domain.payment.PaymentType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder(toBuilder = true)
public class TransactionHistoryResponseDto {
    private String content;
    private Long amount;
    private String storeName;
    private LocalDate transactionDate;
    private LocalTime transactionTime;
    private PaymentType paymentType;
}
