package com.example.backend.domain.plan.service;

import com.example.backend.domain.plan.dto.BudgetSaveDto;
import com.example.backend.domain.plan.dto.BudgetUpdateDto;
import com.example.backend.domain.plan.entity.Budget;
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

    public void budgetUpdate(BudgetUpdateDto budgetUpdateDto) {
        Budget budget = budgetRepository.findByTravel_dateAndCategory(budgetUpdateDto.getTravel_date(), budgetUpdateDto.getCategory());
        budgetRepository.save(budget);
    }
}
