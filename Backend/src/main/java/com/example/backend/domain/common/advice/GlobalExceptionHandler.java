package com.example.backend.domain.common.advice;

import com.example.backend.domain.account.exception.CertificationCodeNotMatchedException;
import com.example.backend.domain.account.exception.UserNotFoundException;
import com.example.backend.domain.common.BasicResponse;
import com.example.backend.domain.common.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = UserNotFoundException.class)
    public BasicResponse<Void> ExceptionHandler(UserNotFoundException e) {
        return BasicResponse.<Void>builder()
                .dataHeader(BasicResponse.DataHeader.builder()
                        .successCode("1")
                        .resultCode(HttpStatus.NOT_FOUND)
                        .resultMessage(e.getMessage()).build())
                .build();
    }

    @ExceptionHandler(value = CertificationCodeNotMatchedException.class)
    public BasicResponse<Void> ExceptionHandler(CertificationCodeNotMatchedException e) {
        return BasicResponse.<Void>builder()
                .dataHeader(BasicResponse.DataHeader.builder()
                        .successCode("1")
                        .resultCode(HttpStatus.BAD_REQUEST)
                        .resultMessage(e.getMessage()).build())
                .build();
    }

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public BasicResponse<Void> ExceptionHandler(ResourceNotFoundException e) {
        return BasicResponse.<Void>builder()
                .dataHeader(BasicResponse.DataHeader.builder()
                        .successCode("1")
                        .resultCode(HttpStatus.NOT_FOUND)
                        .resultMessage(e.getMessage()).build())
                .build();
    }
}
