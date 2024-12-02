package com.excelr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Finances;
import com.excelr.repo.FinancesRepo;

@Service
public class FinanceService {

    @Autowired
    private FinancesRepo repo;

    public Finances savePaySlip(Finances finances) {
        double basicSalary = finances.getCtc() * 0.3;
        finances.setBasicsalary(basicSalary);

        double pf = finances.getCtc() * 0.12;
        finances.setPf(pf);

        double hra = finances.getCtc() * 0.3;
        finances.setHra(hra);

        double tds = finances.getCtc() * 0.3;
        finances.setTds(tds);

        double allowances = finances.getCtc() * 0.3;
        finances.setAllowances(allowances);

        double netSalary = basicSalary + hra + allowances - pf - tds;
        finances.setNet_salary(netSalary);

        return repo.save(finances);
    }
    
    public Finances recalculateFinanceFields(Finances finances) {
        double basicSalary = finances.getCtc() * 0.3;
        finances.setBasicsalary(basicSalary);

        double pf = finances.getCtc() * 0.12;
        finances.setPf(pf);

        double hra = finances.getCtc() * 0.3;
        finances.setHra(hra);

        double tds = finances.getCtc() * 0.3;
        finances.setTds(tds);

        double allowances = finances.getCtc() * 0.3;
        finances.setAllowances(allowances);

        double netSalary = basicSalary + hra + allowances - pf - tds;
        finances.setNet_salary(netSalary);

        return repo.save(finances);
    }

	
}
