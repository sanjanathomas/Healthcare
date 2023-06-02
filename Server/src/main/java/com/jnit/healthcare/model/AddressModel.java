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
public class AddressModel {

    private Long id;

    @NotNull
    @Size(min=1)
    private String street;

    private String aptNo;

    @NotNull
    @Size(min=1)
    private String city;

    @NotNull
    @Size(min=1)
    private String state;

    @NotNull
    @Size(min=1)
    private String country;

}
