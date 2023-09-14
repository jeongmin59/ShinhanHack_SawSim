package com.example.backend.domain.account.service;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.dto.CheckDepositAccountRequestDto;
import com.example.backend.domain.account.dto.CheckDepositAccountResponseDto;
import com.example.backend.domain.account.dto.ConfirmTransferRequestDto;
import com.example.backend.domain.account.dto.ConfirmTransferResponseDto;
import com.example.backend.domain.account.exception.CertificationCodeNotMatchedException;
import com.example.backend.domain.account.exception.UserNotFoundException;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.common.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {
    private final RedisService redisService;
    private final AccountRepository accountRepository;

    public String storeAuthMemoInRedis(String accountNumber, String authMemo, String name) {
        Map<String, String> map = Map.of("authMemo", authMemo, "name", name);
        redisService.setHash(300, accountNumber, map); // 만료시간 5분
        return accountNumber;
    }

    public String verifyAuthNumber(String accountNumber, String authNumber) {
        Map<Object, Object> hash = redisService.getHash(accountNumber);

        if (hash == null || hash.isEmpty()) {
            throw new UserNotFoundException();
        }

        String name = (String) hash.get("name");
        String realNumber = (String) hash.get("authMemo");

        if (!realNumber.equals(authNumber)) {
            throw new CertificationCodeNotMatchedException();
        }

        return name;
    }

    @Transactional
    public String registerAccount(String username, String accountNumber) {
        Account account = Account.createAccount(username, accountNumber, UUID.randomUUID().toString());
        Account saveAccount = accountRepository.save(account);

        return saveAccount.getUserNumber();
    }

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
}
