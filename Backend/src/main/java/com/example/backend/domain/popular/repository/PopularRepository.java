package com.example.backend.domain.popular.repository;

import com.example.backend.domain.popular.entity.Popular;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PopularRepository extends JpaRepository<Popular, Long> {

    Optional<Popular> findByStoreName(String storeName);
}
