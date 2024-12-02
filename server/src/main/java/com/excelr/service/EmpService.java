package com.excelr.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Employee;
import com.excelr.repo.EmpRepo;

@Service
public class EmpService {
  
	@Autowired
	private EmpRepo repo;
	
	public Employee saveEmployee(Employee employee) {
        return repo.save(employee);
    }

    public Optional<Employee> getEmployeeById(long id) {
        return repo.findById(id);
    }

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public Employee updateEmployee(Employee employee) {
        return repo.save(employee);
    }

    public void deleteEmployeeById(long id) {
    	repo.deleteById(id);
    }


  
    
}
