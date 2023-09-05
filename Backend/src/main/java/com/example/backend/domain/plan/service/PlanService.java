package com.example.backend.domain.plan.service;

import com.example.backend.domain.plan.dto.PlanDetailResponseDto;
import com.example.backend.domain.plan.dto.PlanSaveRequestDto;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;

    public void planSave(PlanSaveRequestDto planSaveRequestDto, Long accountId) {
        Plan plan = new Plan(
                null,
                accountId,
                planSaveRequestDto.getDataBody().getStartDate(),
                planSaveRequestDto.getDataBody().getEndDate()
        );

        planRepository.save(plan);

    }

    public List<Plan> planList(Long accountId) {
        return planRepository.findAllByAccountId(accountId)
                .orElse(Collections.emptyList());
    }

    public PlanDetailResponseDto planDetail(Long planId) {
        Optional<Plan> plan = planRepository.findById(planId);

        if(plan.isEmpty()){
            return null;
        }

        PlanDetailResponseDto planDetailResponseDto = PlanDetailResponseDto.builder()
                .accountId(plan.get().getAccountId())
                .startDate(plan.get().getStartDate())
                .endDate(plan.get().getEndDate())
                .build();

        return planDetailResponseDto;

    }
}
