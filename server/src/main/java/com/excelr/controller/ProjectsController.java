package com.excelr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.model.Projects;
import com.excelr.repo.ProjectsRepo;
import com.excelr.service.ProjectService;

@RestController
@CrossOrigin("*")
public class ProjectsController {
	
	@Autowired
	private ProjectsRepo repo;
	
	@Autowired
	private ProjectService projectservice;
	
	@GetMapping("/getAllProjects")
    public List<Projects> getAllProjects() {
        return repo.findAll();
    }
	
	@GetMapping("/getAllProjectsById/{id}")
    public Optional<Projects> getAllProjectsByID(@PathVariable Long id) {
        return repo.findById(id);
    }
	
	@PostMapping("/status")
	public Projects status(@RequestBody Projects projects) {
		return repo.save(projects);
	}
	@PostMapping("/{id}/hold")
    public ResponseEntity<Projects> holdProject(@PathVariable Long id) {
        Optional<Projects> projectsOptional = repo.findById(id);
        if (projectsOptional.isPresent()) {
        	Projects projects = projectsOptional.get();
        	projects.setStatus(Projects.ProjectStatus.ON_HOLD);
            repo.save(projects);
            return ResponseEntity.ok(projects); 
        } else {
            return null;
        }
    }
	
	@PostMapping("/{id}/progress")
    public ResponseEntity<Projects> progressProject(@PathVariable Long id) {
        Optional<Projects> projectsOptional = repo.findById(id);
        if (projectsOptional.isPresent()) {
        	Projects projects = projectsOptional.get();
        	projects.setStatus(Projects.ProjectStatus.IN_PROGRESS);
            repo.save(projects);
            return ResponseEntity.ok(projects); 
        } else {
            return null;
        }
    }
	
	@PostMapping("/{id}/completed")
    public ResponseEntity<Projects> completeProject(@PathVariable Long id) {
        Optional<Projects> projectsOptional = repo.findById(id);
        if (projectsOptional.isPresent()) {
        	Projects projects = projectsOptional.get();
        	projects.setStatus(Projects.ProjectStatus.COMPLETED);
            repo.save(projects);
            return ResponseEntity.ok(projects); 
        } else {
            return null;
        }
    }
	
	@PostMapping("/{id}/open")
    public ResponseEntity<Projects> openProject(@PathVariable Long id) {
        Optional<Projects> projectsOptional = repo.findById(id);
        if (projectsOptional.isPresent()) {
        	Projects projects = projectsOptional.get();
        	projects.setStatus(Projects.ProjectStatus.OPEN);
            repo.save(projects);
            return ResponseEntity.ok(projects); 
        } else {
            return null;
        }
    }
	
	@GetMapping("/completed")
    public List<Projects> getCompletedProject() {
      return repo.findByStatus(Projects.ProjectStatus.COMPLETED);
}
	
	@GetMapping("/progress")
    public List<Projects> getProgressProject() {
      return repo.findByStatus(Projects.ProjectStatus.IN_PROGRESS);
}
	
	@GetMapping("/open")
    public List<Projects> getOpenProject() {
      return repo.findByStatus(Projects.ProjectStatus.OPEN);
}
	
	@GetMapping("/hold")
    public List<Projects> getHoldProject() {
      return repo.findByStatus(Projects.ProjectStatus.ON_HOLD);
}
	
	@DeleteMapping("/deleteProject/{id}")
	public ResponseEntity<String> deleteProject(@PathVariable Long id) {
	  repo.deleteById(id);
	  return ResponseEntity.ok("Project Deleted!");
	}
	
	@PutMapping("/projects/{projectId}")
    public ResponseEntity<Projects> updateProject(@PathVariable Long projectId,
                                                  @RequestBody Projects updatedProject) {
        Projects updated = projectservice.updateProject(projectId, updatedProject);
        return ResponseEntity.ok(updated);
    }

}
