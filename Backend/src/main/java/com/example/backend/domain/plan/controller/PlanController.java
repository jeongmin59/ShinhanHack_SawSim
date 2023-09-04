package com.example.backend.domain.plan.controller;

import com.example.backend.domain.plan.dto.PlanSaveRequestDto;
import com.example.backend.domain.plan.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/plan")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @PostMapping()
    public void planSave(@RequestBody PlanSaveRequestDto planSaveRequestDto){
        //Header User-Number를 통해서 계좌 ID를 받아옴
        //보류
        Long account_id = 0L; //임시값

        planService.planSave(planSaveRequestDto,account_id);

    }
}
