package com.example.backend.domain.portfolio.repository;

import com.example.backend.domain.portfolio.entity.TransactionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<TransactionHistory, Long> {
    List<TransactionHistory> findByTravelDate(LocalDate travelDate);
}
