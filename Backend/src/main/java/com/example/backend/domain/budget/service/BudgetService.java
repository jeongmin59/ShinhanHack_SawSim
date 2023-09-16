package com.example.backend.domain.budget.service;

import com.example.backend.domain.budget.dto.BudgetDeleteRequestDto;
import com.example.backend.domain.budget.dto.BudgetGetResponseDto;
import com.example.backend.domain.budget.dto.BudgetSaveResponseDto;
import com.example.backend.domain.budget.dto.BudgetUpdateRequestDto;
import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.repository.BudgetRepository;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final PlanRepository planRepository;

    public List<BudgetGetResponseDto> budgetGet(Long planId) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new NotFoundException("생성되지 않은 여행계획입니다."));
        List<Budget> budgetList = budgetRepository.findAllByPlan(plan);

        List<BudgetGetResponseDto> budgetGetResponseDtoList = new ArrayList<>();

        for (Budget budget : budgetList) {
            BudgetGetResponseDto budgetGetResponseDto = BudgetGetResponseDto.builder()
                    .budgetId(budget.getBudgetId())
                    .travelDate(budget.getTravelDate())
                    .category(budget.getCategory())
                    .amount(budget.getAmount())
                    .build();

            budgetGetResponseDtoList.add(budgetGetResponseDto);
        }

        return  budgetGetResponseDtoList;
    }

    public int budgetSave(BudgetSaveResponseDto budgetSaveDto) {

        Plan plan = planRepository.findById(budgetSaveDto.getPlanId())
                .orElseThrow(() -> new NotFoundException("생성되지 않은 여행계획입니다."));

        Optional<Budget> find_budget = budgetRepository.findByTravelDateAndCategoryAndPlan(
                budgetSaveDto.getTravelDate(),
                budgetSaveDto.getCategory(),
                plan
        );

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

    public void budgetUpdate(BudgetUpdateRequestDto budgetUpdateRequestDto,Long planId) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new NotFoundException("생성되지 않은 여행계획입니다."));

        Optional<Budget> budget = budgetRepository.findByTravelDateAndCategoryAndPlan(
                budgetUpdateRequestDto.getDataBody().getTravelDate(),
                budgetUpdateRequestDto.getDataBody().getCategory(),
                plan
        );

        if (budget.isPresent()) {
            budget.get().setAmount(budgetUpdateRequestDto.getDataBody().getAmount());
            budgetRepository.save(budget.get());
        }

    }

    public void budgetDelete(BudgetDeleteRequestDto budgetDeleteRequestDto,Long planId) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new NotFoundException("생성되지 않은 여행계획입니다."));

        budgetRepository.delete(
                budgetRepository.findByTravelDateAndCategoryAndPlan(
                            budgetDeleteRequestDto.getDataBody().getTravelDate(),
                            budgetDeleteRequestDto.getDataBody().getCategory(),
                            plan
                        )
                        .orElseThrow(() -> new NullPointerException())
        );
    }
}
