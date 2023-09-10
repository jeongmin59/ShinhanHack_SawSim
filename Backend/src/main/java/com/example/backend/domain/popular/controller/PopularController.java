package com.example.backend.domain.popular.controller;

import com.example.backend.domain.common.BasicResponse;
import com.example.backend.domain.popular.dto.PopularResponseDto;
import com.example.backend.domain.popular.service.PopularService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/popular")
@RequiredArgsConstructor
public class PopularController {

    private final PopularService popularService;

    @GetMapping()
    public BasicResponse<PopularResponseDto> popularGet(){
        PopularResponseDto popularResponseDto = popularService.popularGet();

        return BasicResponse.<PopularResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(popularResponseDto)
                .build();
    }
}
