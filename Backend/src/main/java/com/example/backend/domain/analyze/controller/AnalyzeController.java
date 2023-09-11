package com.example.backend.domain.analyze.controller;

import com.example.backend.domain.analyze.dto.AnalyzeRequestDto;
import com.example.backend.domain.analyze.dto.AnalyzeResponseDto;
import com.example.backend.domain.analyze.service.AnalyzeService;
import com.example.backend.domain.common.BasicResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analyze/{plan_id}")
@RequiredArgsConstructor
public class AnalyzeController {

    private final AnalyzeService analyzeService;

    @PostMapping
    public BasicResponse<AnalyzeResponseDto> analyzeGet(@RequestBody AnalyzeRequestDto analyzeRequestDto, @RequestHeader("User-Number") String userNumber
    ,@PathVariable Long plan_id){
        AnalyzeResponseDto analyzeResponseDto = analyzeService.analyzeGet(analyzeRequestDto, userNumber, plan_id);


        return BasicResponse.<AnalyzeResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(analyzeResponseDto)
                .build();
    }
}
