package com.example.backend.domain.payment.repository;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByAccountId(Long accountId);

    List<Payment> findByAccountAndDate(Account account, LocalDate today);
}
