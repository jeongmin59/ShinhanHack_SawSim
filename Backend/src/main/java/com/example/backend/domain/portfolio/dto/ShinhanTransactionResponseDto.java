package com.example.backend.domain.portfolio.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder(toBuilder = true)
public class ShinhanTransactionResponseDto {
    private DataHeader dataHeader;
    private DataBody dataBody;

    @Getter
    public static class DataHeader {
        private String successCode;
        private String resultCode;
        private String resultMessage;
    }

    @Getter
    public static class DataBody {
        private String 계좌번호;
        private String 상품명;
        private String 계좌잔액;
        private String 고객명;
        private String 거래내역반복횟수;
        private List<거래내역> 거래내역;

        // 생성자, getter, setter 생략

        public static class 거래내역 {
            private String 거래일자;
            private String 거래시간;
            private String 적요;
            @JsonProperty("출금금액")
            @JsonAlias("출금")
            @JsonAlias("출금액")
            @JsonAlias("withdrawalAmount")
    }
}
