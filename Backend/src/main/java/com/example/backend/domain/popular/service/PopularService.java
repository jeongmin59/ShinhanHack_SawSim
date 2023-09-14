package com.example.backend.domain.popular.service;

import com.example.backend.domain.popular.dto.PopularResponseDto;
import com.example.backend.domain.popular.entity.Popular;
import com.example.backend.domain.popular.repository.PopularRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PopularService {
    private final PopularRepository popularRepository;

    public PopularResponseDto popularGet() {
        List<Popular> popularList = popularRepository.findAll();

        List<PopularResponseDto.PopularPlace> popularPlaces = new ArrayList<>();
        for (Popular popular : popularList) {
            PopularResponseDto.PopularPlace popularPlace = PopularResponseDto.PopularPlace.builder()
                    .popularId(popular.getId())
                    .store(popular.getStoreName())
                    .img(popular.getThumbnail())
                    .category(popular.getCategory())
                    .build();
            popularPlaces.add(popularPlace);
        }

        PopularResponseDto popularResponseDto = PopularResponseDto.builder()
                .popularPlaces(popularPlaces)
                .build();

        return popularResponseDto;
    }
}
