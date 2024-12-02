package com.excelr.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.excelr.security.service.UserDetailsServiceImpl;

@Configuration
public class SecurityConfig {

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private com.excelr.security.jwt.AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public com.excelr.security.jwt.AuthTokenFilter authenticationJwtTokenFilter() {
        return new com.excelr.security.jwt.AuthTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic(Customizer.withDefaults())
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.POST, "/employee").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/employee/{id}", "/employees").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.GET, "/employee/{id}").hasRole( "USER")
                .requestMatchers(HttpMethod.PUT, "/updateemployee/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/updateemployees/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/employee/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/savePayslip").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/finances/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/viewFinances/{id}").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.GET, "/viewAllFinances").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/status").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/{id}/hold").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/{id}/progress").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/{id}/completed").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/{id}/open").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/completed").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/progress").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/hold").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/open").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE,"/deleteProject/{id}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/projects/{projectId}").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/getAllProjectsById/{id}").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.GET, "/getAllProjects").hasRole("ADMIN")
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
            .csrf(csrf -> csrf.disable());

        return http.build();
    }
}
