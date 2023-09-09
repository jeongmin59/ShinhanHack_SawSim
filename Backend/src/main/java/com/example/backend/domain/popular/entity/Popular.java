package com.example.backend.domain.popular.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Popular {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer popularId;

    private String store;
    @Lob
    private byte[] img;
    private String category;


}
