package com.jnit.healthcare.service;

import com.jnit.healthcare.entity.Appointment;
import com.jnit.healthcare.exception.BussinessException;
import com.jnit.healthcare.model.AppointmentModel;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

@Service
public interface AppointmentService {

    Appointment createAppointment(AppointmentModel appointmentModel) throws BussinessException;

    Set<Appointment> getAppointmentsByEmail(String email) throws BussinessException;

    Set<Appointment> getAppointmentsByDate(LocalDate date, String email) throws BussinessException;

    Appointment deleteAppointment(Long id) throws BussinessException;

    Appointment updateAppointment(AppointmentModel appointmentModel) throws BussinessException;
}
