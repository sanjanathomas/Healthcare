package com.jnit.healthcare.Mapper;

import com.jnit.healthcare.entity.Appointment;
import com.jnit.healthcare.entity.User;
import com.jnit.healthcare.exception.BussinessException;
import com.jnit.healthcare.model.AppointmentModel;
import com.jnit.healthcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    @Autowired
    UserService userService;

    public Appointment mapUserModelToEntity(AppointmentModel appointmentModel) throws BussinessException {

        Appointment appointment = new Appointment();
        appointment.setDate(appointmentModel.getDate());
        appointment.setTime(appointmentModel.getTime());

        User patient = userService.findByEmail(appointmentModel.getPatientEmail());
        User doctor = userService.findByEmail(appointmentModel.getDoctorEmail());
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        return appointment;
    }
}
