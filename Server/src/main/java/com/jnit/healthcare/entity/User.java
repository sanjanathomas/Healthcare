package com.jnit.healthcare.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastname")
    private String lastName;

    @Column
    private String email;

    @Column
    @JsonIgnore
    private String password;

    @Column
    private String phone;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "address_id", referencedColumnName ="id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "role_id" , referencedColumnName = "id")
    private Role role;

//    @OneToMany(mappedBy = "user")
//    Set<Appointment> appointments;

}
