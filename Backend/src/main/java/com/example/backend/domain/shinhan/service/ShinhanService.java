package com.example.backend.domain.shinhan.service;

import com.example.backend.domain.shinhan.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ShinhanService {

    /**
     * 예금주 실명 조회
     */

    public CheckDepositAccountResponseDto checkDepositAccount(CheckDepositAccountRequestDto checkDepositAccountRequestDto) {

        //신한 거래내역조회 api 요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://shbhack.shinhan.com")
                .build();

        return webClient
                .post()
                .uri("/v1/search/name")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(checkDepositAccountRequestDto)
                .retrieve()
                .bodyToMono(CheckDepositAccountResponseDto.class)
                .block();
    }


    public ConfirmTransferResponseDto confirmTransfer(ConfirmTransferRequestDto confirmTransferRequestDto) {
        //신한 거래내역조회 api 요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://shbhack.shinhan.com")
                .build();

        return webClient
                .post()
                .uri("/v1/auth/1transfer")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(confirmTransferRequestDto)
                .retrieve()
                .bodyToMono(ConfirmTransferResponseDto.class)
                .block();

    }

    public AccountBalanceDetailResponseDto accountBalanceDetail(AccountBalanceDetailRequestDto accountBalanceDetail) {
        //신한 거래내역조회 api 요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://shbhack.shinhan.com")
                .build();

        return webClient
                .post()
                .uri("/v1/account/balance/detail")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(accountBalanceDetail)
                .retrieve()
                .bodyToMono(AccountBalanceDetailResponseDto.class)
                .block();
    }

    public CheckAccountTransactionHistoryResponseDto checkAccountTransactionHistory(CheckAccountTransactionHistoryRequestDto checkAccountTransactionHistoryRequestDto) {
        //신한 거래내역조회 api 요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://shbhack.shinhan.com")
                .build();

        return webClient
                .post()
                .uri("/v1/search/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(checkAccountTransactionHistoryRequestDto)
                .retrieve()
                .bodyToMono(CheckAccountTransactionHistoryResponseDto.class)
                .block();
    }
}
