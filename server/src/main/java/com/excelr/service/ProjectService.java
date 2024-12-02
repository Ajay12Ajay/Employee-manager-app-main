package com.excelr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.model.Projects;
import com.excelr.repo.ProjectsRepo;

import jakarta.persistence.EntityNotFoundException;

//ProjectService.java
@Service
public class ProjectService {


 @Autowired
 private ProjectsRepo repo;

 public Projects updateProject(Long projectId, Projects updatedProject) {
     Projects existingProject = repo.findById(projectId)
             .orElseThrow(() -> new EntityNotFoundException("Project not found"));

     // Update relevant fields
     existingProject.setProjectName(updatedProject.getProjectName());
     existingProject.setDescription(updatedProject.getDescription());
     existingProject.setStartDate(updatedProject.getStartDate());
     existingProject.setEndDate(updatedProject.getEndDate());
     existingProject.setProjectManager(updatedProject.getProjectManager());
     existingProject.setStatus(updatedProject.getStatus());

     // Save the updated project
     return repo.save(existingProject);
 }
}
