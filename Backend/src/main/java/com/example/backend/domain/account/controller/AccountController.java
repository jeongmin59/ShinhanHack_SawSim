package com.example.backend.domain.account.controller;

import com.example.backend.domain.account.dto.AuthMemoRequestDto;
import com.example.backend.domain.account.dto.AuthMemoResponseDto;
import com.example.backend.domain.account.service.AccountService;
import com.example.backend.domain.common.BasicResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("auth/memo")
    public BasicResponse<AuthMemoResponseDto> storeAuthMemo(@RequestBody AuthMemoRequestDto authMemoRequestDto) {
        String accountNumber = accountService.storeAuthMemoInRedis(authMemoRequestDto);

        AuthMemoResponseDto authMemoResponseDto = AuthMemoResponseDto.builder()
                .accountNumber(accountNumber)
                .build();

        return BasicResponse.<AuthMemoResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(authMemoResponseDto)
                .build();
    }
}
