package com.jnit.healthcare.controller;


import com.jnit.healthcare.exception.BussinessException;
import com.jnit.healthcare.entity.User;
import com.jnit.healthcare.model.LoginModel;
import com.jnit.healthcare.model.UserModel;
import com.jnit.healthcare.service.AccountService;
import com.jnit.healthcare.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<User> register(@Valid @RequestBody UserModel user) throws BussinessException {

        User userAccount = userService.register(user);
        return ResponseEntity.ok().body(userAccount);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginModel loginModel) throws BussinessException {
        return ResponseEntity.ok().body(userService.login(loginModel));
    }

//    @GetMapping("/logout/{email}")
//    public ResponseEntity<?> logout( @PathVariable String email) throws BussinessException {
//        userService.logout(email);
//        return ResponseEntity.ok().body("User logged out");
//    }


}
