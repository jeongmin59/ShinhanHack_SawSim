package com.example.backend.domain.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class ShinhanTransactionRequestDto {
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
        private String accountId;
        @JsonProperty("상품명")
        private String product;
        @JsonProperty("계좌잔액")
        private String accountBalance;
        @JsonProperty("고객명")
        private String customerName;
        @JsonProperty("거래내역반복횟수")
        private String repeats;
        @JsonProperty("거래내역")
        private List<TransactionHistory> transactions;

        // 생성자, getter, setter 생략

        @Getter
        public static class TransactionHistory {
            @JsonProperty("거래일자")
            private String transactionDate;
            @JsonProperty("거래시간")
            private String transactionTime;
            @JsonProperty("적요")
            private String briefs;
            @JsonProperty("출금금액")
            private long withdrawalAmount;
            @JsonProperty("입금금액")
            private long depositAmount;
            @JsonProperty("내용")
            private String detail;
            @JsonProperty("잔액")
            private String balance;
            @JsonProperty("입지구분")
            private int locationClassification;
            @JsonProperty("거래점명")
            private String storeName;


        }
    }
}
