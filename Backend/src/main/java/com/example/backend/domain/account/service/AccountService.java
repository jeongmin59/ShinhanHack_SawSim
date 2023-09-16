package com.example.backend.domain.account.service;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.exception.CertificationCodeNotMatchedException;
import com.example.backend.domain.account.exception.UserNotFoundException;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.common.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
