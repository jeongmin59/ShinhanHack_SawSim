package com.example.backend.domain.popular.service;

import com.example.backend.domain.popular.dto.PopularResponseDto;
import com.example.backend.domain.popular.repository.PopularRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PopularService {
    private final PopularRepository popularRepository;

    public List<PopularResponseDto> popularGet(double lon, double lat, String category) {
        return popularRepository.findNearbyPopularStores(lon, lat, category).stream()
                .map(PopularResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}
