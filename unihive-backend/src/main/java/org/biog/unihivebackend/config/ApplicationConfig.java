package org.biog.unihivebackend.config;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.biog.unihivebackend.model.User;
import org.biog.unihivebackend.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

  public final UserRepository userRepository;

  @Bean
  public UserDetailsService userDetailsService() {
    return username -> {
      Optional<User> user = userRepository.findByEmail(username);
      if (
        user.isPresent() &&
        (
          user.get().getRole().equals("ADMIN") ||
          user.get().getRole().equals("STUDENT") ||
          user.get().getRole().equals("CLUB")
        )
      ) {
        return user.get();
      } else {
        return null;
      }
    };
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService());
    authProvider.setPasswordEncoder(passwordEncoder());
    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(
    AuthenticationConfiguration config
  ) throws Exception {
    return config.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
