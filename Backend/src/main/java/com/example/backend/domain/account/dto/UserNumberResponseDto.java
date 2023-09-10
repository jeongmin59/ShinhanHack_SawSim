package com.example.backend.domain.account.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(toBuilder = true)
public class UserNumberResponseDto {
    private String userNumber;
    private String name;
}