package com.jnit.healthcare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "address")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String street;

    @Column
    private String aptNo;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String country;

    @Column
    @OneToMany(mappedBy = "address")
    private Set<User> user;

}
