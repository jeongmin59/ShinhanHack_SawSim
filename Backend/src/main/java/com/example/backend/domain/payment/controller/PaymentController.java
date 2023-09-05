package com.example.backend.domain.payment.controller;

import com.example.backend.domain.common.BasicResponse;
import com.example.backend.domain.payment.dto.LatestDateTimeResponseDto;
import com.example.backend.domain.payment.dto.TransactionHistoryRequestDto;
import com.example.backend.domain.payment.dto.TransactionHistoryResponseDto;
import com.example.backend.domain.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @Operation(summary = "여행비 사용 내역 조회", description = "실제 여행을 하며 사용한 내역을 조회하는 API")
    @GetMapping("/transactions")
    public BasicResponse<List<TransactionHistoryResponseDto>> getTransactionHistory(@RequestHeader("User-Number") String userNumber) {
        List<TransactionHistoryResponseDto> transactionHistory = paymentService.getTransactionHistory(userNumber);

        return BasicResponse.<List<TransactionHistoryResponseDto>>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(transactionHistory)
                .build();
    }

    @Operation(summary = "최신 거래내역 시간 조회", description = "조회한 적이 있는 신한 계좌 거래내역 중 가장 최신 거래일자 조회하는 API")
    @GetMapping("/transactions/latest-date")
    public BasicResponse<LatestDateTimeResponseDto> getLatestDateTime(@RequestHeader("User-Number") String userNumber) {
        LatestDateTimeResponseDto latestDateTimeResponseDto = paymentService.getLatestDateTime(userNumber);

        return BasicResponse.<LatestDateTimeResponseDto>builder()
                .dataHeader(BasicResponse.DataHeader.builder().build()) // 성공일 때 값이 default
                .dataBody(latestDateTimeResponseDto)
                .build();
    }
}
