package com.example.backend.domain.common;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@Builder
public class BasicResponse<T> {

    private final DataHeader dataHeader;
    private final T dataBody;

    @Getter
    @Builder(toBuilder = true)
    public static class DataHeader {
        @Builder.Default
        private String successCode = "0";
        @Builder.Default
        private HttpStatus resultCode = HttpStatus.OK;
        @Builder.Default
        private String resultMessage = "";
    }
}
