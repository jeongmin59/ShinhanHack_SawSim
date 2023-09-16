package com.example.backend.domain.budget.controller;

import com.example.backend.domain.budget.dto.*;
import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.service.BudgetService;
import com.example.backend.domain.common.BasicResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget/{planId}")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping()
    public BasicResponse<List<BudgetGetResponseDto>> budgetGet(@PathVariable Long planId){
        List<BudgetGetResponseDto> budgets = budgetService.budgetGet(planId);

        return BasicResponse.<List<BudgetGetResponseDto>>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(budgets)
                .build();
    }


    @PostMapping()
    public BasicResponse<BudgetSaveResponseDto> budgetSave(@RequestBody BudgetSaveRequestDto budgetSaveRequestDto, @PathVariable Long planId){

        BudgetSaveResponseDto budgetSaveResponseDto = BudgetSaveResponseDto.builder()
                .planId(planId)
                .amount(budgetSaveRequestDto.getDataBody().getAmount())
                .category(budgetSaveRequestDto.getDataBody().getCategory())
                .travelDate(budgetSaveRequestDto.getDataBody().getTravelDate())
                .build();

        int check = budgetService.budgetSave(budgetSaveResponseDto);

        if(check==1){ //중복으로 인한 저장 실패
            return BasicResponse.<BudgetSaveResponseDto>builder()
                    .dataHeader(
                            BasicResponse.DataHeader.builder()
                                    .successCode("1")
                                    .build()) // 성공일 때 값이 default
                    .build();
        }

        return BasicResponse.<BudgetSaveResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }

    @PutMapping()
    public BasicResponse<BudgetUpdateResponseDto> budgetUpdate(@RequestBody BudgetUpdateRequestDto budgetUpdateRequestDto,@PathVariable Long planId){
        budgetService.budgetUpdate(budgetUpdateRequestDto,planId);

        return BasicResponse.<BudgetUpdateResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }

    @DeleteMapping()
    public BasicResponse<BudgetDeleteResponseDto> budgetDelete(@RequestBody BudgetDeleteRequestDto budgetDeleteRequestDto,@PathVariable Long planId){
        budgetService.budgetDelete(budgetDeleteRequestDto,planId);

        return BasicResponse.<BudgetDeleteResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }

}
