package com.jnit.healthcare.respository;

import com.jnit.healthcare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("from User u where u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    @Query("from User u where u.email = :userName")
    Optional<UserDetails> findByUsername(String userName);

    @Query("from User u where u.role.roleName = :roleName")
    Optional<List<User>> findAllByRoleName(String roleName);

}
