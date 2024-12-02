package com.excelr.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Projects {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String ProjectName;
   private String description;
   private LocalDate startDate;
   private LocalDate endDate;
   private String ProjectManager;
   
   @Enumerated(EnumType.STRING)
   private ProjectStatus status;
   
   public enum ProjectStatus {
       OPEN, IN_PROGRESS, COMPLETED, ON_HOLD
   }

   @ManyToOne
   @JoinColumn(name = "assigned_employee_id")
   private Employee assignedEmployee;
   
public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getProjectName() {
	return ProjectName;
}

public void setProjectName(String projectName) {
	ProjectName = projectName;
}

public String getDescription() {
	return description;
}

public void setDescription(String description) {
	this.description = description;
}

public LocalDate getStartDate() {
	return startDate;
}

public void setStartDate(LocalDate startDate) {
	this.startDate = startDate;
}

public LocalDate getEndDate() {
	return endDate;
}

public void setEndDate(LocalDate endDate) {
	this.endDate = endDate;
}

public ProjectStatus getStatus() {
	return status;
}

public void setStatus(ProjectStatus status) {
	this.status = status;
}


public Employee getAssignedEmployee() {
	return assignedEmployee;
}

public void setAssignedEmployee(Employee assignedEmployee) {
	this.assignedEmployee = assignedEmployee;
}

public String getProjectManager() {
	return ProjectManager;
}

public void setProjectManager(String projectManager) {
	ProjectManager = projectManager;
}

@Override
public String toString() {
	return "Projects [id=" + id + ", ProjectName=" + ProjectName + ", description=" + description + ", startDate="
			+ startDate + ", endDate=" + endDate + ", ProjectManager=" + ProjectManager + ", status=" + status
			+ ", assignedEmployee=" + assignedEmployee + "]";
}
   
}
