package com.excelr.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Finances {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private String BankName;
	private String AccountNumber;
	private String ifscCode;
	private String panCard;
	private double ctc;
	private double basicsalary;
	private double pf;
	private double hra;
	private double tds;
	private double allowances;
	private double net_salary;
   
    @ManyToOne
	@JoinColumn(name = "employee_id", referencedColumnName = "Employee_id")
	private Employee employee;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBankName() {
		return BankName;
	}

	public void setBankName(String bankName) {
		BankName = bankName;
	}

	public String getAccountNumber() {
		return AccountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		AccountNumber = accountNumber;
	}

	public String getIfscCode() {
		return ifscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

	public String getPanCard() {
		return panCard;
	}

	public void setPanCard(String panCard) {
		this.panCard = panCard;
	}

	public double getCtc() {
		return ctc;
	}

	public void setCtc(double ctc) {
		this.ctc = ctc;
	}

	public double getBasicsalary() {
		return basicsalary;
	}

	public void setBasicsalary(double basicsalary) {
		this.basicsalary = basicsalary;
	}

	public double getPf() {
		return pf;
	}

	public void setPf(double pf) {
		this.pf = pf;
	}

	public double getHra() {
		return hra;
	}

	public void setHra(double hra) {
		this.hra = hra;
	}

	public double getTds() {
		return tds;
	}

	public void setTds(double tds) {
		this.tds = tds;
	}

	public double getAllowances() {
		return allowances;
	}

	public void setAllowances(double allowances) {
		this.allowances = allowances;
	}

	public double getNet_salary() {
		return net_salary;
	}

	public void setNet_salary(double net_salary) {
		this.net_salary = net_salary;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	@Override
	public String toString() {
		return "Finances [id=" + id + ", BankName=" + BankName + ", AccountNumber=" + AccountNumber + ", ifscCode="
				+ ifscCode + ", panCard=" + panCard + ", ctc=" + ctc + ", basicsalary=" + basicsalary + ", pf=" + pf
				+ ", hra=" + hra + ", tds=" + tds + ", allowances=" + allowances + ", net_salary=" + net_salary
				+ ", employee=" + employee + "]";
	}
    
    
}
