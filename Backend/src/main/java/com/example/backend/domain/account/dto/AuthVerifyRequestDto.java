package com.example.backend.domain.account.dto;

import lombok.Getter;

@Getter
public class AuthVerifyRequestDto {
    private DataBody dataBody;

    @Getter
    public static class DataBody {
        private String accountNumber;
        private String authNumber;
    }
}
