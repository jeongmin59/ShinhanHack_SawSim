package com.example.backend.global.scheduler.dto;

import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
public class AccountHistoryResponse {
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
        private String 계좌번호;
        private String 상품명;
        private String 계좌잔액;
        private String 고객명;
        private int 거래내역반복횟수;
        private List<Transaction> 거래내역;
    }

    @Getter
    public static class Transaction {
        private LocalDate 거래일자;
        private LocalTime 거래시간;
        private String 적요;
        private long 출금금액;
        private long 입금금액;
        private String 내용;
        private long 잔액;
        private int 입지구분;
        private String 거래점명;
    }
}

