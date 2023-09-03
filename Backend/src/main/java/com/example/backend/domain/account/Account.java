package com.example.backend.domain.account;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    private String username;
    private String number;
    private String userNumber;
}
