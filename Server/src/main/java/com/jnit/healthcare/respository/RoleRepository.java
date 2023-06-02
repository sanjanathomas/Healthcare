package com.jnit.healthcare.respository;

import com.jnit.healthcare.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query("from Role r where r.roleName = :roleName")
    Role findByRoleName(@Param("roleName") String roleName);
}
