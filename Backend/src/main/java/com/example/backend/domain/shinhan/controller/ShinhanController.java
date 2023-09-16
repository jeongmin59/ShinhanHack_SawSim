package com.example.backend.domain.shinhan.controller;

import com.example.backend.domain.shinhan.dto.*;
import com.example.backend.domain.shinhan.service.ShinhanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ShinhanController {

    private final ShinhanService shinhanService;
    @PostMapping("/v1/search/name")
    public CheckDepositAccountResponseDto checkDepositAccount(@RequestBody CheckDepositAccountRequestDto checkDepositAccountRequestDto){
        return shinhanService.checkDepositAccount(checkDepositAccountRequestDto);
    }


    /**
     * 1원 이체 확인
     */
    @PostMapping("/v1/auth/1transfer")
    public ConfirmTransferResponseDto confirmTransfer(@RequestBody ConfirmTransferRequestDto confirmTransferRequestDto){
        return shinhanService.confirmTransfer(confirmTransferRequestDto);
    }

    /**
     * 계좌번호로 잔액 조회
     */
    @PostMapping("/v1/account/balance/detail")
    public AccountBalanceDetailResponseDto accountBalanceDetail(@RequestBody AccountBalanceDetailRequestDto accountBalanceDetail){
        return shinhanService.accountBalanceDetail(accountBalanceDetail);
    }

    /**
     * 계좌 거래 내역 조회
     */
    @PostMapping("/v1/search/transaction")
    public CheckAccountTransactionHistoryResponseDto checkAccountTransactionHistory(@RequestBody CheckAccountTransactionHistoryRequestDto checkAccountTransactionHistoryRequestDto){
        System.out.println("checkAccountTransactionHistoryRequestDto.getDataBody().getAccount() = " + checkAccountTransactionHistoryRequestDto.getDataBody().getAccount());
        return shinhanService.checkAccountTransactionHistory(checkAccountTransactionHistoryRequestDto);
    }
}
