package com.excelr.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="Employee_id")
	private long id;
	private String name;
	private String emailId;
	private String password;
	private String contactNumber;
	private int age;
	private String gender;
	private String image;
	private String ReportingManager;
	private String AadharCard;
	private String CompanyName;
	private String designation;
	private String type;
	private String CurrentAddress;
	private String PermanenttAddress;
	private String OfficeAddress;
	
    @ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name="employee_role",joinColumns = @JoinColumn(name="employee_id"),inverseJoinColumns = @JoinColumn(name="role_id"))
	@JsonIgnore
	private Set<Roles> roles;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getReportingManager() {
		return ReportingManager;
	}

	public void setReportingManager(String reportingManager) {
		ReportingManager = reportingManager;
	}

	public String getAadharCard() {
		return AadharCard;
	}

	public void setAadharCard(String aadharCard) {
		AadharCard = aadharCard;
	}

	public String getCompanyName() {
		return CompanyName;
	}

	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCurrentAddress() {
		return CurrentAddress;
	}

	public void setCurrentAddress(String currentAddress) {
		CurrentAddress = currentAddress;
	}

	public String getPermanenttAddress() {
		return PermanenttAddress;
	}

	public void setPermanenttAddress(String permanenttAddress) {
		PermanenttAddress = permanenttAddress;
	}

	public String getOfficeAddress() {
		return OfficeAddress;
	}

	public void setOfficeAddress(String officeAddress) {
		OfficeAddress = officeAddress;
	}

	public Set<Roles> getRoles() {
		return roles;
	}

	public void setRoles(Set<Roles> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", emailId=" + emailId + ", password=" + password
				+ ", contactNumber=" + contactNumber + ", age=" + age + ", gender=" + gender + ", image=" + image
				+ ", ReportingManager=" + ReportingManager + ", AadharCard=" + AadharCard + ", CompanyName="
				+ CompanyName + ", designation=" + designation + ", type=" + type + ", CurrentAddress=" + CurrentAddress
				+ ", PermanenttAddress=" + PermanenttAddress + ", OfficeAddress=" + OfficeAddress + ", roles=" + roles
				+ "]";
	}
    
    
    
}
