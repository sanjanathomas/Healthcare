package com.jnit.healthcare.entity;


import com.jnit.healthcare.model.UserModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Table
@Data@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate date;

    private LocalTime time;

    @ManyToOne
    @JoinColumn(name = "patient_id" , referencedColumnName = "id")
    private User patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id" , referencedColumnName = "id")
    private User doctor;
}
