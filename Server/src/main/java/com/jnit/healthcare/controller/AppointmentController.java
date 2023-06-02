package com.jnit.healthcare.controller;


import com.jnit.healthcare.entity.Appointment;
import com.jnit.healthcare.exception.BussinessException;
import com.jnit.healthcare.exception.ErrorConstants;
import com.jnit.healthcare.model.AppointmentModel;
import com.jnit.healthcare.security.jwt.JWTTokenProvider;
import com.jnit.healthcare.service.AppointmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;

@RestController
@RequestMapping("/account/appointment")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
    Logger logger = LoggerFactory.getLogger(AppointmentController.class);
    @Autowired
    AppointmentService appointmentService;

    @GetMapping("/show/{email}")
    public ResponseEntity<Set<Appointment>> getAppointmnetsByUser(@PathVariable("email") String email) throws BussinessException {
        logger.info("In controller");
        Set<Appointment> appointments = appointmentService.getAppointmentsByEmail(email);
        return ResponseEntity.ok().body(appointments);
    }

    @GetMapping("/show/{date}/{email}")
    public ResponseEntity<Set<Appointment>> getAppointmnetsByDate(@PathVariable("date") @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate date, @PathVariable("email") String email) throws BussinessException {
//        LocalDate localDate = LocalDate.parse(date);
        Set<Appointment> appointments = appointmentService.getAppointmentsByDate(date, email);
        return ResponseEntity.ok().body(appointments);
    }

    @PostMapping("/create")
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentModel appointmentModel) throws BussinessException {
        Appointment appointment = appointmentService.createAppointment(appointmentModel);
        return ResponseEntity.ok().body(appointment);
    }

    @PutMapping("/update")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody AppointmentModel appointmentModel) throws BussinessException {
        Appointment appointment =  appointmentService.updateAppointment(appointmentModel);
        return ResponseEntity.ok().body(appointment);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Appointment> deleteAppointment(@PathVariable("id") Long id) throws BussinessException {
        Appointment appointment = appointmentService.deleteAppointment(id);
        return ResponseEntity.ok().body(appointment);
    }
}
