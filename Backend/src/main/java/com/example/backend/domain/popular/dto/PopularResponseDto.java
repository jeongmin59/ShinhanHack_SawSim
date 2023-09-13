package com.example.backend.domain.popular.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder(toBuilder = true)
public class PopularResponseDto {
    private List<PopularPlace> popularPlaces;
    @Getter
    @Builder(toBuilder = true)
    public static class PopularPlace {
       private Long popularId;
       private String store;
       private String img;
       private String category;
    }
}
