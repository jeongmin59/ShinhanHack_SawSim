package com.example.backend.domain.account;

import com.example.backend.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Account extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "ACCOUNT_ID")
    private Long id;

    private String username;
    private String number;
    private String userNumber;

    public Account(String username, String number, String userNumber) {
        this.username = username;
        this.number = number;
        this.userNumber = userNumber;
    }
}
