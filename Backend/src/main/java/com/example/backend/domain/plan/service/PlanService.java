package com.example.backend.domain.plan.service;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.exception.UserNotFountException;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.plan.dto.PlanDetailResponseDto;
import com.example.backend.domain.plan.dto.PlanSaveRequestDto;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;
    private final AccountRepository accountRepository;

    public void planSave(PlanSaveRequestDto planSaveRequestDto, Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(UserNotFountException::new);

        Plan plan = new Plan(
                null,
                planSaveRequestDto.getDataBody().getStartDate(),
                planSaveRequestDto.getDataBody().getEndDate(),
                account
        );

        planRepository.save(plan);

    }

    public List<Plan> planList(Long accountId) {
        return planRepository.findAllByAccountId(accountId)
                .orElse(Collections.emptyList());
    }

    public PlanDetailResponseDto planDetail(Long planId) {
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new NotFoundException("생성되지 않은 여행계획입니다."));

        return PlanDetailResponseDto.builder()
                .accountId(plan.getAccount().getId())
                .startDate(plan.getStartDate())
                .endDate(plan.getEndDate())
                .build();

    }
}
