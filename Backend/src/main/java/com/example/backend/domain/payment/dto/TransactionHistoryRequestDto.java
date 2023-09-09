package com.example.backend.domain.payment.dto;


import com.example.backend.domain.payment.PaymentType;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
public class TransactionHistoryRequestDto {
    private DataBody dataBody;

    @Getter
    public static class DataBody {
        private List<Transaction> transactionHistory;
    }

    @Getter
    public static class Transaction {
        private String content;
        private Long amount;
        private String storeName;

        @DateTimeFormat(pattern = "yyyyMMdd")
        private LocalDate transactionDate;
        @DateTimeFormat(pattern = "HHmmss")
        private LocalTime transactionTime;
        private PaymentType paymentType;
    }
}
