package com.example.backend.domain.account.dto;

import lombok.Getter;

@Getter
public class AuthMemoRequestDto {
    private DataBody dataBody;

    @Getter
    public static class DataBody {
        private String accountNumber;
        private String name;
        private String authMemo;
    }
}
