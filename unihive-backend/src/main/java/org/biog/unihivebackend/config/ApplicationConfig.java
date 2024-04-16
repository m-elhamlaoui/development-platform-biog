package org.biog.unihivebackend.config;

import java.util.Arrays;
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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

  public final UserRepository userRepository;

  @Bean
  public UserDetailsService userDetailsService() throws UsernameNotFoundException {
    return username -> {
      Optional<User> user = userRepository.findByEmail(username);
      if (user.isPresent() && 
          Arrays.asList("SUPER_ADMIN", "ADMIN", "STUDENT", "CLUB").contains(user.get().getRole().toString())) {
        return user.get();
      } else {
        throw new UsernameNotFoundException("User not found");
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
