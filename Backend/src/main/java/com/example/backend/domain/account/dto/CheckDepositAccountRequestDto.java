package com.example.backend.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CheckDepositAccountRequestDto {
    private DataHeader dataHeader;
    private DataBody dataBody;

    @Getter
    public static class DataHeader {
        private String apikey;
    }

    @Getter
    public static class DataBody {
        @JsonProperty("입금은행코드")
        private String depositBankCode;
        @JsonProperty("입금계좌번호")
        private String depositAccountNumber;
    }

}
