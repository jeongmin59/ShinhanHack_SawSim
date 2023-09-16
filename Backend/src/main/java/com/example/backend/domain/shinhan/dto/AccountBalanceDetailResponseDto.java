package com.example.backend.domain.shinhan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class AccountBalanceDetailResponseDto {
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
        @JsonProperty("출금계좌번호")
        private String withdrawalAccountNumber;
        @JsonProperty("지불가능잔액")
        private String payableBalance;
    }
}
