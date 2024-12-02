package com.excelr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.model.Finances;
import com.excelr.repo.FinancesRepo;
import com.excelr.service.FinanceService;
@RestController
@CrossOrigin("*")
public class FinanceController {
   
	@Autowired
	private FinanceService financeService;
	
	@Autowired
	private FinancesRepo repo;
	
	 
	 @PostMapping("/savePayslip")
	 public Finances saveEmployee(@RequestBody Finances finances) {
		return financeService.savePaySlip(finances);
		 
	 }
	 
	 @GetMapping("/viewFinances/{id}")
	 public Optional<Finances> getPaySlipById(@PathVariable Long id) {
		 return repo.findById(id);
	 }
	 
	 @GetMapping("/viewAllFinances")
	 public List<Finances>getAllfinances(){
		 return repo.findAll();
	 }
	 
	 
	 @PutMapping("/finances/{id}")
	 public ResponseEntity<String> updateCtc(@PathVariable Long id, @RequestParam double ctc) {
	        Optional<Finances> financeOptional = repo.findById(id);
	        
	        if (financeOptional.isPresent()) {
	            Finances finances = financeOptional.get();
	            finances.setCtc(ctc);
	            
	            // Recalculate all finance fields based on the updated CTC
	            Finances updatedFinances = financeService.recalculateFinanceFields(finances);
	            
	            return ResponseEntity.ok("CTC updated successfully. Finance fields recalculated.");
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
}
