package com.example.backend.domain.popular.entity;

public enum CategoryType {
    RESTAURANT("음식점"),
    SIGHTS("관광지"),
    LEISURE("스포츠,레저");

    private final String koreanName;

    CategoryType(String koreanName) {
        this.koreanName = koreanName;
    }

    public String getKoreanName() {
        return koreanName;
    }

    public static CategoryType fromKoreanName(String koreanName) {
        for (CategoryType category : values()) {
            if (category.koreanName.equals(koreanName)) {
                return category;
            }
        }
        throw new IllegalArgumentException("해당 한글 카테고리 이름을 찾을 수 없습니다: " + koreanName);
    }
}
