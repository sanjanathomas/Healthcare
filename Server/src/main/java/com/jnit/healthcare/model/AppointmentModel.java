package com.jnit.healthcare.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentModel {

    private Long id;

    @NotNull
    @JsonFormat(pattern = "MM/dd/yyyy")
    private LocalDate date;

    @NotNull
    @JsonFormat(pattern = "hh:mm:ss a")
    private LocalTime time;

    @NotNull
    @Size(min=1)
    private String patientEmail;

    @NotNull
    @Size(min=1)
    private String doctorEmail;
}
