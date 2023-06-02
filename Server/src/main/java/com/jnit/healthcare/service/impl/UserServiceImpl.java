package com.jnit.healthcare.service.impl;

import com.jnit.healthcare.entity.Address;
import com.jnit.healthcare.exception.BussinessException;
import com.jnit.healthcare.exception.ErrorConstants;
import com.jnit.healthcare.entity.Role;
import com.jnit.healthcare.entity.User;
import com.jnit.healthcare.model.AuthenticationResponse;
import com.jnit.healthcare.model.LoginModel;
import com.jnit.healthcare.model.UserModel;
import com.jnit.healthcare.respository.AddressRepository;
import com.jnit.healthcare.respository.RoleRepository;
import com.jnit.healthcare.respository.UserRepository;
import com.jnit.healthcare.security.jwt.JWTTokenProvider;
import com.jnit.healthcare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenProvider jwtTokenProvider;

    @Override
    public User register(UserModel user) throws BussinessException {

        Optional.ofNullable(roleRepository.findByRoleName(user.getRole().getRoleName()))
                .orElseThrow(() -> new BussinessException(ErrorConstants.ROLE_DOES_NOT_EXIST));

        Optional<User> user1 = userRepository.findByEmail(user.getEmail());

        if(user1.isPresent()) {
            throw new BussinessException(ErrorConstants.USER_ALREADY_EXISTS);
        }


        Role role = new Role();
        role.setId(user.getRole().getId());
        role.setRoleName(user.getRole().getRoleName());

        Address address = new Address();
        address.setStreet(user.getAddress().getStreet());
        address.setAptNo(user.getAddress().getAptNo());
        address.setCity(user.getAddress().getCity());
        address.setState(user.getAddress().getState());
        address.setCountry(user.getAddress().getCountry());

//        Optional<Address> user_address = Optional.ofNullable(addressRepository.save(address));

        User newUser = new User();
        newUser.setRole(role);
        newUser.setAddress(address);
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());
        newUser.setPhone(user.getPhone());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());

        Optional<User> user_account = Optional.ofNullable(userRepository.save(newUser));

        if(!user_account.isPresent()) {
            throw new BussinessException(ErrorConstants.FAILED_TO_REGISTER_USER);
        }

        return user_account.get();
    }

    @Override
    public AuthenticationResponse login(LoginModel loginModel) throws BussinessException {

        User user = userRepository.findByEmail(loginModel.getEmail())
                .orElseThrow(() -> new BussinessException(ErrorConstants.USER_DOES_NOT_EXIST));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginModel.getEmail(),
                        loginModel.getPassword()
                )
        );

        if(authentication.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtTokenProvider.generateToken(loginModel.getEmail());
            return new AuthenticationResponse(jwt);

        } else {
            throw new BussinessException(ErrorConstants.INVALID_USER_CREDETIALS);
        }
    }

    @Override
    public User findByEmail(String email) throws BussinessException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BussinessException(ErrorConstants.USER_DOES_NOT_EXIST + "- " + email ));
    }

    @Override
    public List<User> getUsersByRole(String roleName) throws BussinessException {
        return userRepository.findAllByRoleName(roleName)
                .orElseThrow(() -> new BussinessException(ErrorConstants.USER_DOES_NOT_EXIST));
    }

    @Override
    public User getUserByEmail(String email) throws BussinessException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new BussinessException(ErrorConstants.USER_DOES_NOT_EXIST));
    }

}
