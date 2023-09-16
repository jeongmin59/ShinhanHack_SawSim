package com.example.backend.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class AccountResponseDto {
    private String accountNumber;
    private String name;
}