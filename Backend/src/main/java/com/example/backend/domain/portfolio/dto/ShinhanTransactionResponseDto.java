package com.example.backend.domain.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class ShinhanTransactionResponseDto {
    private DataHeader dataHeader;
    private DataBody dataBody;

    @Getter
    @Builder(toBuilder = true)
    public static class DataHeader{
        private String apikey;
    }

    @Getter
    @Builder(toBuilder = true)
    public static class DataBody {
        @JsonProperty("계좌번호")
        private String accountNumber;
    }
}
