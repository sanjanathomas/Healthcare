package com.jnit.healthcare.service.impl;

import com.jnit.healthcare.Mapper.AppointmentMapper;
import com.jnit.healthcare.entity.Appointment;
import com.jnit.healthcare.entity.User;
import com.jnit.healthcare.exception.BussinessException;
import com.jnit.healthcare.exception.ErrorConstants;
import com.jnit.healthcare.model.AppointmentModel;
import com.jnit.healthcare.respository.AppointmentRepository;
import com.jnit.healthcare.security.jwt.JWTTokenProvider;
import com.jnit.healthcare.service.AppointmentService;
import com.jnit.healthcare.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    Logger logger = LoggerFactory.getLogger(AppointmentServiceImpl.class);
    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    UserService userService;
    @Autowired
    AppointmentMapper appointmentMapper;
    @Autowired
    JWTTokenProvider jwtTokenProvider;

    @Override
    public Appointment createAppointment(AppointmentModel appointmentModel) throws BussinessException {

        isAuthorized(appointmentModel.getPatientEmail());
        User patient = checkValidUser(appointmentModel.getPatientEmail());
        User doctor = checkValidUser(appointmentModel.getDoctorEmail());

        logger.info("patient info {}", patient);
        if(!patient.getRole().getRoleName().equalsIgnoreCase("patient")) {
            throw new BussinessException(ErrorConstants.USER_ROLE_DOES_NOT_MATCH);
        }

        logger.info("doctor info {}", doctor);
        if(!doctor.getRole().getRoleName().equalsIgnoreCase("doctor")) {
            throw new BussinessException(ErrorConstants.DOCTOR_NOT_FOUND);
        }

        checkConflictDoctor(appointmentModel.getDate(), appointmentModel.getTime(), appointmentModel.getDoctorEmail());
        checkConflictPatient(appointmentModel.getDate(), appointmentModel.getTime(), appointmentModel.getPatientEmail());

        Appointment appointment = appointmentMapper.mapUserModelToEntity(appointmentModel);

        Appointment appointment_ = Optional.ofNullable(appointmentRepository.save(appointment))
                .orElseThrow(() -> new BussinessException(ErrorConstants.FAILED_TO_REGISTER_APPOINTMENT));

        return appointment_;

    }

    @Override
    public Set<Appointment> getAppointmentsByEmail(String email) throws BussinessException{
        logger.info("Inside Impl");
        isAuthorized(email);
        User user = userService.findByEmail(email);

        logger.info("user info {}", user);
        if(user.getRole().getRoleName().equalsIgnoreCase("doctor"))
            return Optional.ofNullable(appointmentRepository.findByDoctorEmail(email))
                    .orElseThrow(() -> new BussinessException(ErrorConstants.APPOINMENT_NOT_FOUND + email));
        else if (user.getRole().getRoleName().equalsIgnoreCase("patient"))
            return Optional.ofNullable(appointmentRepository.findByPatientEmail(email))
                    .orElseThrow(() -> new BussinessException(ErrorConstants.APPOINMENT_NOT_FOUND + email));
        else
            throw new BussinessException(ErrorConstants.ROLE_DOES_NOT_EXIST);
    }

    @Override
    public Set<Appointment> getAppointmentsByDate(LocalDate date, String email) throws BussinessException {
        isAuthorized(email);
        return getAppointmentsByEmail(email).stream().filter(appointment -> appointment.getDate().equals(date)).collect(Collectors.toSet());
    }

    @Override
    public Appointment deleteAppointment(Long id) throws BussinessException {

        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if(!appointment.isPresent())
            throw new BussinessException(ErrorConstants.APPOINMENT_DOES_NOT_EXIST);

        try {
            appointmentRepository.deleteById(id);
        } catch (Exception e) {
            throw new BussinessException(ErrorConstants.FAILED_TO_DELETE_APPOINTMENT);
        }

        return appointment.get();

    }

    @Override
    public Appointment updateAppointment(AppointmentModel appointmentModel) throws BussinessException {

        Appointment appointment = appointmentRepository.findById(appointmentModel.getId())
                .orElseThrow(() -> new BussinessException(ErrorConstants.APPOINMENT_DOES_NOT_EXIST));


        checkConflictDoctor(appointmentModel.getDate(), appointmentModel.getTime(), appointmentModel.getDoctorEmail());
        checkConflictPatient(appointmentModel.getDate(), appointmentModel.getTime(), appointmentModel.getPatientEmail());

        appointment.setDate(appointmentModel.getDate());
        appointment.setTime(appointmentModel.getTime());
        appointment.setPatient(userService.findByEmail(appointmentModel.getPatientEmail()));
        appointment.setDoctor(userService.findByEmail(appointmentModel.getDoctorEmail()));

        return Optional.ofNullable(appointmentRepository.save(appointment))
                .orElseThrow(() -> new BussinessException(ErrorConstants.FAILED_TO_UPDATE_APPOINTMENT));
    }

    private void checkConflictDoctor(LocalDate date, LocalTime time, String email) throws BussinessException{
        Optional<Appointment> appointment = Optional.ofNullable(appointmentRepository.findByDateAndTimeAndDoctor(date, time, email));
        if(appointment.isPresent()) {
            throw new BussinessException(ErrorConstants.APPOINTMENT_NOT_AVAILABLE);
        }
    }

    private void checkConflictPatient(LocalDate date, LocalTime time, String email) throws BussinessException{
        Optional<Appointment> appointment = Optional.ofNullable(appointmentRepository.findByDateAndTimeAndPatient(date, time, email));
        if(appointment.isPresent()) {
            throw new BussinessException(ErrorConstants.APPOINTMENT_NOT_AVAILABLE);
        }
    }


    private User checkValidUser(String email) throws BussinessException{
        return userService.findByEmail(email);
    }

    private void isAuthorized(String email) throws BussinessException{
        if(!jwtTokenProvider.getUserNameFromToken(jwtTokenProvider.getToken()).equals(email)) {
            throw new BussinessException(ErrorConstants.NOT_AUTHORIZED);
        }
    }
}
