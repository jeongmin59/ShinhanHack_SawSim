package com.example.backend.domain.account.service;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.common.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {
    private final RedisService redisService;
    private final AccountRepository accountRepository;

    @Transactional
    public String storeAuthMemoInRedis(String accountNumber, String name, String authMemo) {
        Map<String, String> map = Map.of("name", name, "authMemo", authMemo);
        redisService.setHash(300, accountNumber, map); // 만료시간 5분
        return accountNumber;
    }

    public void verifyAuthNumber(String accountNumber, String authNumber) {
        String realNumber = redisService.getValues(accountNumber);
        if (!realNumber.equals(authNumber)) {
            throw new IllegalArgumentException("인증번호가 일치하지 않습니다.");
        }
    }

    public void registerAccount(String accountNumber) {
        // 계좌 등록하기
        Account account = new Account();
        accountRepository.save(account);
    }
}
