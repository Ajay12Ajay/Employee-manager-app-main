package com.excelr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.excelr.model.Finances;

public interface FinancesRepo extends JpaRepository<Finances, Long> {

}
