package com.example.backend.domain.payment.dto;


import lombok.Getter;

@Getter
public class TransactionContentRequestDto {
    private DataBody dataBody;

    @Getter
    public static class DataBody {
        private String content;
    }
}
