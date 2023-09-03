package com.example.backend.domain.common;

import lombok.Builder;
import lombok.Getter;

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
        private String resultCode = "";
        @Builder.Default
        private String resultMessage = "";
    }
}
