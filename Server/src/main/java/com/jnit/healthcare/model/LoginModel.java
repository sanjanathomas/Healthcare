package com.jnit.healthcare.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginModel {

    @NotNull
    @Size(min=1)
    private String email;

    @NotNull
    @Size(min=1)
    private String password;
}
