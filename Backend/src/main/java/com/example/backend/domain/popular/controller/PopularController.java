package com.example.backend.domain.popular.controller;

import com.example.backend.domain.common.BasicResponse;
import com.example.backend.domain.popular.dto.PopularResponseDto;
import com.example.backend.domain.popular.entity.CategoryType;
import com.example.backend.domain.popular.service.PopularService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PopularController {

    private final PopularService popularService;

    @GetMapping("/popular/{categoryType}")
    public BasicResponse<List<PopularResponseDto>> popularGet(@PathVariable CategoryType categoryType,
                                                              @RequestParam double lon,
                                                              @RequestParam double lat) {
        List<PopularResponseDto> popularResponseDto = popularService.popularGet(lon, lat, categoryType.getKoreanName());

        return BasicResponse.<List<PopularResponseDto>>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(popularResponseDto)
                .build();
    }
}
