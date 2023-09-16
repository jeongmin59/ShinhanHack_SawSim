package com.example.backend.domain.account.repository;

import com.example.backend.domain.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findAccountByUserNumber(String userNumber);
    Optional<Account> findAccountByNumber(String number);
}
