package com.example.backend.domain.portfolio.controller;

import com.example.backend.domain.portfolio.dto.PortfolioRequestDto;
import com.example.backend.domain.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/portfolio/{plan_id}")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping("/budget")
    public void portfolioBudgetGet(@RequestBody PortfolioRequestDto portfolioRequestDto,@PathVariable Long plan_id){
        portfolioService.portfolioBudgetGet(portfolioRequestDto,plan_id);
    }
}
