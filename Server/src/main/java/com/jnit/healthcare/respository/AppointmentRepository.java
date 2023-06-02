package com.jnit.healthcare.respository;

import com.jnit.healthcare.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.time.LocalDate;
import java.util.Set;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("from Appointment a where a.date = :date and a.time = :time and a.doctor.email = :email")
    Appointment findByDateAndTimeAndDoctor(@Param("date") LocalDate date, @Param("time") LocalTime Time, @Param("email") String email);

    @Query("from Appointment a where a.doctor.email = :email order by local datetime")
    Set<Appointment> findByDoctorEmail(@Param("email") String email);

    @Query("from Appointment a where a.patient.email = :email order by local datetime")
    Set<Appointment> findByPatientEmail(@Param("email") String email);

    @Query("from Appointment a where a.date = :date and a.time = :time and a.patient.email = :email")
    Appointment findByDateAndTimeAndPatient(LocalDate date, LocalTime time, String email);
}
