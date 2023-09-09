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
       private String store;
       private byte[] img;
       private String category;
    }
}
