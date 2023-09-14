package com.example.backend.domain.account;

import com.example.backend.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ACCOUNTS")
public class Account extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACCOUNT_ID")
    private Long id;

    private String username;
    private String number;
    private String userNumber;

    public static Account createAccount(String username, String number, String userNumber) {
        Account account = new Account();
        account.username = username;
        account.number = number;
        account.userNumber = userNumber;

        return account;
    }
}
