package com.example.backend.domain.portfolio.repository;

import com.example.backend.domain.portfolio.entity.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<TransactionHistory, Long> {
}
