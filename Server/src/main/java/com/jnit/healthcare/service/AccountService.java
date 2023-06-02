package com.jnit.healthcare.service;

import com.jnit.healthcare.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface AccountService {

    public User register(User user);
}
