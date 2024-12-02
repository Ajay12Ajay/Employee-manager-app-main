package com.excelr.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.excelr.security.service.UserDetailsImpl;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtils {

  @Value("${bezkoder.app.jwtSecret}")
  private String jwtSecret;

  @Value("${bezkoder.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  private final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

  public Map<String, Object> generateJwtToken(Authentication authentication) {
    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationMs);
    String token = Jwts.builder()
        .setSubject(userPrincipal.getUsername())
        .setIssuedAt(now)
        .setExpiration(expiryDate)
        .signWith(SignatureAlgorithm.HS256, jwtSecret)
        .compact();

    Map<String, Object> tokenMap = new HashMap<>();
    tokenMap.put("accessToken", token);
    tokenMap.put("tokenType", "Bearer");
    tokenMap.put("tokenExpiration", expiryDate.getTime());

    return tokenMap;
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parserBuilder()
               .setSigningKey(jwtSecret)
               .build()
               .parseClaimsJws(token)
               .getBody()
               .getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder()
          .setSigningKey(jwtSecret)
          .build()
          .parseClaimsJws(authToken);
      return true;
    } catch (JwtException e) {
      logger.error("Invalid JWT token: {}", e.getMessage());
      return false;
    }
  }
}
