package com.example.backend.domain.plan.service;

import com.example.backend.domain.plan.dto.BudgetDeleteDto;
import com.example.backend.domain.plan.dto.BudgetSaveDto;
import com.example.backend.domain.plan.dto.BudgetUpdateDto;
import com.example.backend.domain.plan.entity.Budget;
import com.example.backend.domain.plan.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public List<Budget> budgetGet(Long planId) {
        return budgetRepository.findAllByPlan_id(planId);
    }

    public void budgetSave(BudgetSaveDto budgetSaveDto) {
        budgetRepository.save(budgetSaveDto);
    }

    public void budgetUpdate(BudgetUpdateDto budgetUpdateDto) {
        Budget budget = budgetRepository.findByTravel_dateAndCategory(budgetUpdateDto.getTravel_date(), budgetUpdateDto.getCategory()).get();
        budgetRepository.save(budget);
    }

    public void budgetDelete(BudgetDeleteDto budgetDeleteDto) {
        budgetRepository.delete(
                budgetRepository.findByTravel_dateAndCategory(budgetDeleteDto.getTravel_date(),budgetDeleteDto.getCategory()).orElseThrow(
                        () -> new NullPointerException()
                )
        );
    }
}
