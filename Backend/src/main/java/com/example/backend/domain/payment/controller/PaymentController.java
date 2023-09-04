package com.example.backend.domain.payment.controller;

import com.example.backend.domain.common.BasicResponse;
import com.example.backend.domain.payment.dto.TransactionHistoryRequestDto;
import com.example.backend.domain.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @Operation(summary = "여행비 사용 내역 저장", description = "실제 여행을 하며 사용한 내역을 저장하는 API")
    @PostMapping("/transactions")
    public BasicResponse<Void> saveTransactionHistory(@RequestHeader("User-Number") String userNumber,
                                                      @RequestBody TransactionHistoryRequestDto transactionHistoryRequestDto) {
        paymentService.registerTransactionHistory(userNumber, transactionHistoryRequestDto);

        return BasicResponse.<Void>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .build();
    }
}
