package com.example.backend.domain.budget.controller;

import com.example.backend.domain.budget.dto.BudgetDeleteDto;
import com.example.backend.domain.budget.dto.BudgetSaveDto;
import com.example.backend.domain.budget.dto.BudgetUpdateDto;
import com.example.backend.domain.budget.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budget/{plan_id}")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping()
    public void budgetGet(@PathVariable Long plan_id){
        budgetService.budgetGet(plan_id);
    }


    @PostMapping()
    public void budgetSave(@RequestBody BudgetSaveDto budgetSaveDto, @PathVariable Long plan_id){
        budgetSaveDto.setPlan_id(plan_id);
        budgetService.budgetSave(budgetSaveDto);
    }

    @PutMapping()
    public void budgetUpdate(@RequestBody BudgetUpdateDto budgetUpdateDto){
        budgetService.budgetUpdate(budgetUpdateDto);
    }

    @DeleteMapping()
    public void budgetDelete(@RequestBody BudgetDeleteDto budgetDeleteDto){
        budgetService.budgetDelete(budgetDeleteDto);
    }

}
