package com.example.backend.domain.account.controller;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.dto.*;
import com.example.backend.domain.account.exception.UserNotFoundException;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.account.service.AccountService;
import com.example.backend.domain.common.BasicResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;

    @Operation(summary = "1원 이체 입금통장메모 저장", description = "1원 이체 시 입금통장메모에 적은 인증번호를 임시저장하는 API")
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

    @Operation(summary = "1원 이체 인증번호 검증 및 계좌 등록", description = "1원 이체 인증번호를 검증하고 검증이 성공할 시 여행 계좌로 등록하는 API")
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

    @Operation(summary = "여행 계좌 조희", description = "등록된 여행 계좌를 조회")
    @GetMapping("/auth/accounts")
    public BasicResponse<AccountResponseDto> getAccount(@RequestHeader("User-Number") String userNumber) {
        Account account = accountRepository.findAccountByUserNumber(userNumber)
                .orElseThrow(UserNotFoundException::new);

        AccountResponseDto accountResponseDto = AccountResponseDto.builder()
                .accountNumber(account.getNumber())
                .name(account.getUsername())
                .build();

        return BasicResponse.<AccountResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build())
                .dataBody(accountResponseDto)
                .build();
    }

    @Operation(summary = "회원 번호 조회", description = "등록했던 여행 계좌로 회원 번호 조회")
    @GetMapping("/user-number")
    public BasicResponse<UserNumberResponseDto> getAccount(@RequestBody UserNumberRequestDto userNumberRequestDto) {
        Account account = accountRepository.findAccountByNumber(userNumberRequestDto.getDataBody().getAccountNumber())
                .orElseThrow(UserNotFoundException::new);

        UserNumberResponseDto userNumberResponseDto = UserNumberResponseDto.builder()
                .userNumber(account.getUserNumber())
                .name(account.getUsername())
                .build();

        return BasicResponse.<UserNumberResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build())
                .dataBody(userNumberResponseDto)
                .build();
    }
}
