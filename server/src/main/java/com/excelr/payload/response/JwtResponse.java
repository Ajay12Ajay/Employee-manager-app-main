package com.excelr.payload.response;

import java.util.List;
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String emailId; // Change 'username' to 'emailId'
    private List<String> roles;
    private Long tokenExpiration;

    public JwtResponse(String accessToken, Long id, String emailId, List<String> roles, Long tokenExpiration) {
        this.token = accessToken;
        this.id = id;
        this.emailId = emailId; // Set 'emailId'
        this.roles = roles;
        this.tokenExpiration = tokenExpiration;
    }

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public Long getTokenExpiration() {
		return tokenExpiration;
	}

	public void setTokenExpiration(Long tokenExpiration) {
		this.tokenExpiration = tokenExpiration;
	}

    // Getters and setters
    
}