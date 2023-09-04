package com.example.backend.domain.portfolio.repository;

import com.example.backend.domain.portfolio.entity.Portfolio;
import com.example.backend.domain.portfolio.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
