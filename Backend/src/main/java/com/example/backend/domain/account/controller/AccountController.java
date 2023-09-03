package com.example.backend.domain.account.controller;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.dto.*;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.account.service.AccountService;
import com.example.backend.domain.common.BasicResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;

    @PostMapping("/auth/memo")
    public BasicResponse<AuthMemoResponseDto> storeAuthMemo(@RequestBody AuthMemoRequestDto authMemoRequestDto) {
        String accountNumber = accountService.storeAuthMemoInRedis(
                authMemoRequestDto.getDataBody().getAccountNumber(),
                authMemoRequestDto.getDataBody().getAuthMemo(),
                authMemoRequestDto.getDataBody().getName());

        AuthMemoResponseDto authMemoResponseDto = AuthMemoResponseDto.builder()
                .accountNumber(accountNumber)
                .build();

        return BasicResponse.<AuthMemoResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(authMemoResponseDto)
                .build();
    }

    @PostMapping("/auth/verify")
    public BasicResponse<AuthVerifyResponseDto> registerAccount(@RequestBody AuthVerifyRequestDto authVerifyRequestDto) {
        String username = accountService.verifyAuthNumber(authVerifyRequestDto.getDataBody().getAccountNumber(), authVerifyRequestDto.getDataBody().getAuthNumber());
        String userNumber = accountService.registerAccount(username, authVerifyRequestDto.getDataBody().getAccountNumber());

        AuthVerifyResponseDto authVerifyResponseDto = AuthVerifyResponseDto.builder()
                .userNumber(userNumber)
                .build();

        return BasicResponse.<AuthVerifyResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build())
                .dataBody(authVerifyResponseDto)
                .build();
    }

    @GetMapping("/auth/accounts")
    public BasicResponse<AccountResponseDto> getAccount(@RequestHeader("User-Number") String userNumber) {
        Account account = accountRepository.findAccountByUserNumber(userNumber)
                .orElseThrow(() -> new IllegalArgumentException("올바른 유저가 아닙니다."));

        AccountResponseDto accountResponseDto = AccountResponseDto.builder()
                .accountNumber(account.getNumber())
                .name(account.getUsername())
                .build();

        return BasicResponse.<AccountResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build())
                .dataBody(accountResponseDto)
                .build();
    }
}
