package com.example.backend.domain.payment.repository;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByAccountId(Long accountId);

    List<Payment> findByAccountAndTransactionDate(Account account, LocalDate today);

    Optional<Payment> findByAccountAndId(Account account, Long id);
}
