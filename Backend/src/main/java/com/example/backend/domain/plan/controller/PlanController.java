package com.example.backend.domain.plan.controller;

import com.example.backend.domain.account.Account;
import com.example.backend.domain.account.exception.UserNotFoundException;
import com.example.backend.domain.account.repository.AccountRepository;
import com.example.backend.domain.common.BasicResponse;
import com.example.backend.domain.plan.dto.*;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/plan")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;
    private final AccountRepository accountRepository;

    @PostMapping()
    public BasicResponse<PlanSaveResponseDto> planSave(@RequestBody PlanSaveRequestDto planSaveRequestDto, @RequestHeader("User-Number") String userNumber){
        planService.planSave(planSaveRequestDto,userNumber);

        return BasicResponse.<PlanSaveResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }

    @PostMapping("{planId}")
    public BasicResponse<PlanUpdateResponseDto> planUpdate(@RequestBody PlanUpdateRequestDto planUpdateRequestDto,  @RequestHeader("User-Number") String userNumber , @PathVariable Long planId){
        planService.planUpdate(planUpdateRequestDto,userNumber,planId);

        return BasicResponse.<PlanUpdateResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }

    @GetMapping()
    public BasicResponse<PlanGetResponseDto> planGet(@RequestHeader("User-Number") String userNumber){

        PlanGetResponseDto planGetResponseDto = planService.planGet(userNumber);

        return BasicResponse.<PlanGetResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(planGetResponseDto)
                .build();
    }

    @GetMapping("/{plan_id}")
    public BasicResponse<PlanDetailResponseDto> planDetail(@PathVariable Long plan_id){
        PlanDetailResponseDto planDetailResponseDto = planService.planDetail(plan_id);

        return BasicResponse.<PlanDetailResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(planDetailResponseDto)
                .build();
    }
}
