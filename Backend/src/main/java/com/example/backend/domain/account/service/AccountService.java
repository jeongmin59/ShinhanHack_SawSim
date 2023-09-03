package com.example.backend.domain.account.service;

import com.example.backend.domain.account.dto.AuthMemoRequestDto;
import com.example.backend.domain.common.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountService {
    private final RedisService redisService;

    @Transactional
    public String storeAuthMemoInRedis(AuthMemoRequestDto authMemoRequestDto) {
        String accountNumber = authMemoRequestDto.getDataBody().getAccountNumber();
        String authMemo = authMemoRequestDto.getDataBody().getAuthMemo();

        redisService.setValues(accountNumber, authMemo, 300); // 만료시간 5분
        return accountNumber;
    }
}
