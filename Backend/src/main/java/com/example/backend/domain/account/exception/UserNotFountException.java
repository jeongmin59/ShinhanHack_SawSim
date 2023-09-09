package com.example.backend.domain.account.exception;

public class UserNotFountException extends RuntimeException {
    public UserNotFountException() {
        super("가입된 유저가 아닙니다.");
    }
}
