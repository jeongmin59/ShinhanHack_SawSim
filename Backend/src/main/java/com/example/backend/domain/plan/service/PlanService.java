package com.example.backend.domain.plan.service;

import com.example.backend.domain.plan.dto.PlanSaveRequestDto;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;

    public void planSave(PlanSaveRequestDto planSaveRequestDto, Long accountId) {
        Plan plan = new Plan(
                null,
                accountId,
                planSaveRequestDto.getDataBody().getStart_date(),
                planSaveRequestDto.getDataBody().getEnd_date()
        );

        planRepository.save(plan);

    }
}
