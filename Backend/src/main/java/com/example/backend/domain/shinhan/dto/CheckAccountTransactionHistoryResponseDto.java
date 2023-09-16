package com.example.backend.domain.shinhan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
public class CheckAccountTransactionHistoryResponseDto {
    private DataHeader dataHeader;
    private DataBody dataBody;

    @Getter
    public static class DataHeader {
        private String successCode;
        private String resultCode;
        private String resultMessage;
    }


    @Getter
    public static class DataBody {
        @JsonProperty("계좌번호")
        private String accountNumber;
        @JsonProperty("상품명")
        private String productName;
        @JsonProperty("계좌잔액")
        private String accountBalance;
        @JsonProperty("거래내역반복횟수")
        private String transactionRepeats;

        @JsonProperty("거래내역")
        private List<TransactionHistory> transactionHistoryList;

        @Getter
        public static class TransactionHistory {
            @JsonProperty("거래일자")
            private LocalDate transactionDate;
            @JsonProperty("거래시간")
            private LocalTime transactionTime;
            @JsonProperty("적요")
            private String briefs;
            @JsonProperty("출금금액")
            private String withdrawalAmount;
            @JsonProperty("입금금액")
            private String depositAmount;
            @JsonProperty("내용")
            private String detail;
            @JsonProperty("잔액")
            private String balance;
            @JsonProperty("입지구분")
            private String locationClassification;
            @JsonProperty("거래점명")
            private String transactionStoreName;
        }

    }
}
