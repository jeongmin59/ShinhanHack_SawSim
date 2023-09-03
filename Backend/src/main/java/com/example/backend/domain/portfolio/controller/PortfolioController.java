package com.example.backend.domain.portfolio.controller;

import com.example.backend.domain.portfolio.dto.PortfolioRequestDto;
import com.example.backend.domain.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping()
    public void portfolioGet(@RequestBody PortfolioRequestDto portfolioRequestDto){
        portfolioService.portfolioGet(portfolioRequestDto);
    }
}
