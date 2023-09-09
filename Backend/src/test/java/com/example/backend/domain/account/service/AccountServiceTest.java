package com.example.backend.domain.account.service;

import com.example.backend.domain.account.exception.CertificationCodeNotMatchedException;
import com.example.backend.domain.common.redis.service.RedisService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@SpringBootTest
@TestPropertySource("classpath:test-application.properties")
class AccountServiceTest {

    @InjectMocks
    private AccountService accountService;

    @Mock
    private RedisService redisService;

    @Test
    public void 입력한_값이_1원_발송_인증번호와_같다() {
        // given
        String accountNumber = "1234567890";
        String authNumber = "1234";
        String name = "GilDong Hong";

        // when
        when(redisService.getHash(accountNumber)).thenReturn(Map.of("name", name, "authMemo", authNumber));

        String resultName = accountService.verifyAuthNumber(accountNumber, authNumber);

        // then
        assertThat(resultName).isEqualTo(name);
    }

    @Test
    public void 입력한_값이_1원_발송_인증번호와_다르면_에러를_낸다() {
        // given
        String accountNumber = "1234567890";
        String authNumber = "1234";
        String name = "GilDong Hong";

        // when
        when(redisService.getHash(accountNumber)).thenReturn(Map.of("name", name, "authMemo", authNumber));

        // then
        assertThatThrownBy(() -> accountService.verifyAuthNumber(accountNumber, "0099"))
                .isInstanceOf(CertificationCodeNotMatchedException.class);
    }

    @Test
    public void 계좌번호에_해당하는_인증번호가_Redis에_없으면_에러를_낸다() {
        // given
        String accountNumber = "1234567890";

        // when
        when(redisService.getHash(accountNumber)).thenReturn(null);

        // then
        assertThatThrownBy(() -> accountService.verifyAuthNumber(accountNumber, ""))
                .isInstanceOf(NullPointerException.class);
    }
}