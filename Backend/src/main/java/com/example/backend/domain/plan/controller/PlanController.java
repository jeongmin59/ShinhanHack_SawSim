package com.example.backend.domain.plan.controller;

import com.example.backend.domain.common.BasicResponse;
import com.example.backend.domain.plan.dto.PlanDetailResponse;
import com.example.backend.domain.plan.dto.PlanSaveRequestDto;
import com.example.backend.domain.plan.entity.Plan;
import com.example.backend.domain.plan.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plan")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @PostMapping()
    public BasicResponse<Plan> planSave(@RequestBody PlanSaveRequestDto planSaveRequestDto){
        //Header User-Number를 통해서 계좌 ID를 받아옴
        //보류
        Long accountId = 0L; //임시값

        planService.planSave(planSaveRequestDto,accountId);

        return BasicResponse.<Plan>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }

    @GetMapping()
    public BasicResponse<List<Plan>> planList(){
        //Header User-Number를 통해서 계좌 ID를 받아옴
        //보류
        Long accountId = 0L; //임시값

        List<Plan> planList = planService.planList(accountId);

        return BasicResponse.<List<Plan>>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(planList)
                .build();
    }

    @GetMapping("/{plan_id}")
    public BasicResponse<PlanDetailResponse> planDetail(@PathVariable Long plan_id){
        PlanDetailResponse planDetailResponse = planService.planDetail(plan_id);

        return BasicResponse.<PlanDetailResponse>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(planDetailResponse)
                .build();
    }
}
