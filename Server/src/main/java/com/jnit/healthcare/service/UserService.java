package com.jnit.healthcare.service;

import com.jnit.healthcare.exception.BussinessException;
import com.jnit.healthcare.entity.User;
import com.jnit.healthcare.model.AuthenticationResponse;
import com.jnit.healthcare.model.LoginModel;
import com.jnit.healthcare.model.UserModel;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    User register(@Valid UserModel user) throws BussinessException;

    AuthenticationResponse login(LoginModel loginModel) throws BussinessException;

    User findByEmail(String email) throws BussinessException;

    List<User> getUsersByRole(String roleName) throws BussinessException;

    User getUserByEmail(String email) throws BussinessException;

//    void logout(String email);
}
