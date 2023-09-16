package com.example.backend.domain.shinhan.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CheckAccountTransactionHistoryRequestDto {
    private DataHeader dataHeader;
    private DataBody dataBody;

    @Getter
    public static class DataHeader {
        private String apikey;
    }

    @Getter
    public static class DataBody {
        @JsonProperty("계좌번호")
        private String account;

    }
}
