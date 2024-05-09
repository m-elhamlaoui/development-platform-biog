package org.biog.unihivebackend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(requests -> requests
            .requestMatchers("/auth/authenticate", "/auth/signup", "/auth/forgotPassword")
            .permitAll()
            .requestMatchers("/auth/register/**")
            .hasRole("SUPER_ADMIN")
            .requestMatchers("/admin/**", "/auth/register/admin", "/auth/acceptrequest/**")
            .hasAnyRole("ADMIN", "SUPER_ADMIN")
            .requestMatchers("/auth/register/club")
            .hasAnyRole("CLUB", "SUPER_ADMIN")
            .requestMatchers("/student/**", "/auth/register/student")
            .hasAnyRole("STUDENT", "SUPER_ADMIN")
            .requestMatchers("/auth/changePassword", "/auth/logout")
            .hasAnyRole("SUPER_ADMIN", "ADMIN", "CLUB", "STUDENT")
            .requestMatchers("/superadmin/**")
            .hasRole("SUPER_ADMIN")
            .requestMatchers("/upload/**", "/download/**", "/delete/**", "/list/**", "/file/**").permitAll()
            .requestMatchers("/club/**", "/event/**")
            .permitAll()
            .requestMatchers("/**")
            .hasRole("SUPER_ADMIN")
            .requestMatchers("/student/events")
            .hasRole("STUDENT")
            .requestMatchers("/student/club/**")
            .hasRole("STUDENT")

            .anyRequest()
            .authenticated())

        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(
            jwtAuthFilter,
            UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
