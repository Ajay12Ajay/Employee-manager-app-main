package com.excelr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.excelr.model.Employee;
import com.excelr.service.EmpService;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@CrossOrigin("*")
public class EmpController {
   
    @Autowired
    private EmpService empServices;
    
 
    @PostMapping("/employee")
    public ResponseEntity<Employee> saveEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok().body(empServices.saveEmployee(employee));
    }
    
    @GetMapping("/employee/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id) {
        Optional<Employee> employee = empServices.getEmployeeById(id);
        return employee.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getEmployees() {
        return ResponseEntity.ok().body(empServices.getAllEmployees());
    }
    
    @PutMapping("/updateemployee/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employee) {
      // Get the existing employee from the database (optional)
      Optional<Employee> existingEmployee = empServices.getEmployeeById(id);

      // Update the employee object with the new values
      if (existingEmployee.isPresent()) {
        Employee existingEmp = existingEmployee.get();
        existingEmp.setDesignation(employee.getDesignation());
        existingEmp.setReportingManager(employee.getReportingManager());
        existingEmp.setType(employee.getType());

        // Update other fields if needed (name, email, etc.)
      } else {
        // Handle case where employee with id is not found (throw exception or return appropriate message)
      }

      // Save the updated employee
      return ResponseEntity.ok().body(empServices.updateEmployee(existingEmployee.orElse(employee)));
    }
    
    @PutMapping("/updateemployees/{id}")
    public ResponseEntity<Employee> updateEmployees(@PathVariable long id, @RequestBody Employee employee) {
      // Get the existing employee from the database (optional)
      Optional<Employee> existingEmployee = empServices.getEmployeeById(id);

      // Update the employee object with the new values
      if (existingEmployee.isPresent()) {
        Employee existingEmp = existingEmployee.get();
        existingEmp.setDesignation(employee.getDesignation());
        existingEmp.setType(employee.getType());

        // Update other fields if needed (name, email, etc.)
      } else {
        // Handle case where employee with id is not found (throw exception or return appropriate message)
      }

      // Save the updated employee
      return ResponseEntity.ok().body(empServices.updateEmployee(existingEmployee.orElse(employee)));
    }
    
    @DeleteMapping("/employee/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable long id) {
        empServices.deleteEmployeeById(id);
        return ResponseEntity.ok().body("Record Deleted..!");
    }
}
