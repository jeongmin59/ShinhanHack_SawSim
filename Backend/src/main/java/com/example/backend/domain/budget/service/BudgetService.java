package com.example.backend.domain.budget.service;

import com.example.backend.domain.budget.dto.*;
import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.repository.BudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;

    public List<Budget> budgetGet(Long planId) {
        return budgetRepository.findAllByPlanId(planId);
    }

    public int budgetSave(BudgetSaveResponseDto budgetSaveDto) {

        Optional<Budget> find_budget = budgetRepository.findByTravelDateAndCategory(budgetSaveDto.getTravelDate(), budgetSaveDto.getCategory());

        //값이 존재하면 중복으로 실패 의미 1리턴
        if(find_budget.isPresent()){
            return 1;
        }

        Budget budget = new Budget(
                null,
                budgetSaveDto.getPlanId(),
                budgetSaveDto.getCategory(),
                budgetSaveDto.getAmount(),
                budgetSaveDto.getTravelDate()
        );
        budgetRepository.save(budget);

        return 0;
    }

    public void budgetUpdate(BudgetUpdateRequestDto budgetUpdateRequestDto) {
        Optional<Budget> budget = budgetRepository.findByTravelDateAndCategory(budgetUpdateRequestDto.getDataBody().getTravelDate(), budgetUpdateRequestDto.getDataBody().getCategory());

        if(budget.isPresent()){
            budget.get().setAmount(budgetUpdateRequestDto.getDataBody().getAmount());
            budgetRepository.save(budget.get());
        }

    }

    public void budgetDelete(BudgetDeleteRequestDto budgetDeleteRequestDto) {
        budgetRepository.delete(
                budgetRepository.findByTravelDateAndCategory(budgetDeleteRequestDto.getDataBody().getTravelDate(),budgetDeleteRequestDto.getDataBody().getCategory()).orElseThrow(
                        () -> new NullPointerException()
                )
        );
    }
}
