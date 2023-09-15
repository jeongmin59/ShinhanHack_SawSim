package com.example.backend.domain.popular.repository;

import com.example.backend.domain.popular.entity.Popular;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PopularRepository extends JpaRepository<Popular, Long> {

    Optional<Popular> findByStoreName(String storeName);

    @Query(value = "SELECT * FROM find_nearby_stores(:lat,:lon,:category)", nativeQuery = true)
    List<Popular> findNearbyPopularStores(@Param("lat") double lat,@Param("lon") double lon, @Param("category") String category);
}
