package com.example.backend.domain.shinhan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CheckDepositAccountResponseDto {
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
        @JsonProperty("입금은행코드")
        private String depositBankCode;
        @JsonProperty("입금계좌번호")
        private String depositAccountNumber;
        @JsonProperty("입금계좌성명")
        private String depositAccountName;
    }
}
