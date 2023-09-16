package com.example.backend.domain.popular.dto;

import com.example.backend.domain.popular.entity.Popular;
import lombok.Getter;

@Getter
//@Builder(toBuilder = true)
public class PopularResponseDto {
        private Long popularId;
        private String storeName;
        private String thumbnail;
        private String category;
        private double x;
        private double y;

    public static PopularResponseDto fromEntity(Popular popular) {
        PopularResponseDto dto = new PopularResponseDto();
        dto.popularId = popular.getId();
        dto.storeName = popular.getStoreName();
        dto.thumbnail = popular.getThumbnail();
        dto.category = popular.getCategory();
        dto.x = popular.getLocations().getX();
        dto.y = popular.getLocations().getY();

        return dto;
    }
}
