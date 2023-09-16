package com.example.backend.domain.payment.repository;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByAccountId(Long accountId);

    List<Payment> findByAccountAndTransactionDate(Account account, LocalDate today);

    @Query("select p from Payment p where p.id > :id")
    List<Payment> findAfterId(@Param("id") Long id);

    Optional<Payment> findByAccountAndId(Account account, Long id);
}
