package com.example.backend.domain.portfolio.controller;


import com.example.backend.domain.common.BasicResponse;
import com.example.backend.domain.portfolio.dto.PortfolioResponseDto;
import com.example.backend.domain.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/portfolio/{plan_id}")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @PostMapping("/budget")
    public BasicResponse<PortfolioResponseDto> portfolioBudgetGet(@RequestHeader("User-Number") String userNumber , @PathVariable Long plan_id){
        PortfolioResponseDto portfolioResponseDto = portfolioService.portfolioBudgetGet(userNumber, plan_id);


        return BasicResponse.<PortfolioResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(portfolioResponseDto)
                .build();
    }

}
