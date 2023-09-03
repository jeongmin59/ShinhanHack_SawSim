package com.example.backend.domain.plan.service;

import com.example.backend.domain.plan.dto.BudgetSaveDto;
import com.example.backend.domain.plan.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public void budgetSave(BudgetSaveDto budgetSaveDto) {
        budgetRepository.save(budgetSaveDto);
    }
}
