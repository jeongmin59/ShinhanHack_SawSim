package com.example.backend.domain.budget.service;

import com.example.backend.domain.budget.dto.BudgetDeleteRequestDto;
import com.example.backend.domain.budget.dto.BudgetSaveResponseDto;
import com.example.backend.domain.budget.dto.BudgetUpdateRequestDto;
import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.repository.BudgetRepository;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final PlanRepository planRepository;

    public List<Budget> budgetGet(Long planId) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new NotFoundException("생성되지 않은 여행계획입니다."));
        return budgetRepository.findAllByPlan(plan);
    }

    public int budgetSave(BudgetSaveResponseDto budgetSaveDto) {

        Optional<Budget> find_budget = budgetRepository.findByTravelDateAndCategory(budgetSaveDto.getTravelDate(), budgetSaveDto.getCategory());

        Plan plan = planRepository.findById(budgetSaveDto.getPlanId())
                .orElseThrow(() -> new NotFoundException("생성되지 않은 여행계획입니다."));

        //값이 존재하면 중복으로 실패 의미 1리턴
        if (find_budget.isPresent()) {
            return 1;
        }

        Budget budget = new Budget(
                null,
                budgetSaveDto.getCategory(),
                budgetSaveDto.getAmount(),
                budgetSaveDto.getTravelDate(),
                plan
        );
        budgetRepository.save(budget);

        return 0;
    }

    public void budgetUpdate(BudgetUpdateRequestDto budgetUpdateRequestDto) {
        Optional<Budget> budget = budgetRepository.findByTravelDateAndCategory(budgetUpdateRequestDto.getDataBody().getTravelDate(), budgetUpdateRequestDto.getDataBody().getCategory());

        if (budget.isPresent()) {
            budget.get().setAmount(budgetUpdateRequestDto.getDataBody().getAmount());
            budgetRepository.save(budget.get());
        }

    }

    public void budgetDelete(BudgetDeleteRequestDto budgetDeleteRequestDto) {
        budgetRepository.delete(
                budgetRepository.findByTravelDateAndCategory(budgetDeleteRequestDto.getDataBody().getTravelDate(), budgetDeleteRequestDto.getDataBody().getCategory())
                        .orElseThrow(() -> new NullPointerException())
        );
    }
}
