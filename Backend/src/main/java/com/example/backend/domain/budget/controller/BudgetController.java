package com.example.backend.domain.budget.controller;

import com.example.backend.domain.budget.dto.*;
import com.example.backend.domain.budget.entity.Budget;
import com.example.backend.domain.budget.service.BudgetService;
import com.example.backend.domain.common.BasicResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budget/{planId}")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping()
    public BasicResponse<List<Budget>> budgetGet(@PathVariable Long planId){
        List<Budget> budgets = budgetService.budgetGet(planId);

        return BasicResponse.<List<Budget>>builder()
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
    public BasicResponse<BudgetUpdateResponseDto> budgetUpdate(@RequestBody BudgetUpdateRequestDto budgetUpdateRequestDto){
        budgetService.budgetUpdate(budgetUpdateRequestDto);

        return BasicResponse.<BudgetUpdateResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }

    @DeleteMapping()
    public BasicResponse<BudgetDeleteResponseDto> budgetDelete(@RequestBody BudgetDeleteRequestDto budgetDeleteRequestDto){
        budgetService.budgetDelete(budgetDeleteRequestDto);

        return BasicResponse.<BudgetDeleteResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }

}
