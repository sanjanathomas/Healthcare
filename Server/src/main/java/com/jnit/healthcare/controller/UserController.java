package com.jnit.healthcare.controller;

import com.jnit.healthcare.entity.User;
import com.jnit.healthcare.exception.BussinessException;
import com.jnit.healthcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/type/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable("role") String roleName) throws BussinessException {
        List<User> users = userService.getUsersByRole(roleName);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/info/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) throws BussinessException {
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok().body(user);
    }
}
