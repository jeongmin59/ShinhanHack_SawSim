package com.example.backend.domain.account.dto;

import lombok.Getter;

@Getter
public class UserNumberRequestDto {
    private AuthMemoRequestDto.DataBody dataBody;

    @Getter
    public static class DataBody {
        private String accountNumber;
    }
}
