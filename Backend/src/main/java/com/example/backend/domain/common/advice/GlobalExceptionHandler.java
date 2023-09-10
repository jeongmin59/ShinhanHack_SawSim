package com.example.backend.domain.common.advice;

import com.example.backend.domain.account.exception.CertificationCodeNotMatchedException;
import com.example.backend.domain.account.exception.UserNotFoundException;
import com.example.backend.domain.common.BasicResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = UserNotFoundException.class)
    public BasicResponse<Void> ExceptionHandler(UserNotFoundException e) {
        return BasicResponse.<Void>builder()
                .dataHeader(BasicResponse.DataHeader.builder()
                        .resultCode(HttpStatus.NOT_FOUND)
                        .resultMessage(e.getMessage()).build())
                .build();
    }

    @ExceptionHandler(value = CertificationCodeNotMatchedException.class)
    public BasicResponse<Void> ExceptionHandler(CertificationCodeNotMatchedException e) {
        return BasicResponse.<Void>builder()
                .dataHeader(BasicResponse.DataHeader.builder()
                        .resultCode(HttpStatus.BAD_REQUEST)
                        .resultMessage(e.getMessage()).build())
                .build();
    }
}
