package com.jnit.healthcare.model;

import com.jnit.healthcare.entity.Address;
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
public class UserModel {

    private Long id;

    @NotNull
    @Size(min=1)
    private String firstName;

    private String lastName;

    @NotNull
    private AddressModel address;

    @NotNull
    private RoleModel role;

    @NotNull
    @Size(min=1)
    private String email;

    @NotNull
    @Size(min=1)
    private String password;

    @NotNull
    @Size(min=1)
    private String phone;
}
