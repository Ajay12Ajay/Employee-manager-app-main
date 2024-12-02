package com.excelr.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.excelr.model.Employee;
import com.excelr.repo.EmpRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private EmpRepo repo;
    
    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
        Employee employee = repo.findByEmailId(emailId);
        if (employee == null) {
            throw new UsernameNotFoundException("User not found with email: " + emailId);
        }

        return UserDetailsImpl.build(employee);
    }
}
