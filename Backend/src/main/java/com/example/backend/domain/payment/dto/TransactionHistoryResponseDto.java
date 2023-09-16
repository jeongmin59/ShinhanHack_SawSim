package com.example.backend.domain.payment.dto;

import com.example.backend.domain.payment.PaymentType;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder(toBuilder = true)
public class TransactionHistoryResponseDto {
    private Long id;
    private String content;
    private Long amount;
    private String storeName;
    @JsonFormat(pattern = "yyyyMMdd")
    private LocalDate transactionDate;
    @JsonFormat(pattern = "HHmmss")
    private LocalTime transactionTime;
    private PaymentType paymentType;
}
