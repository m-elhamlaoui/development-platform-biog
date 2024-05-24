package org.biog.unihivebackend.auth;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register/admin")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public ResponseEntity<AuthenticationResponse> registerAdmin(
      @RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.registerAdmin(request));
  }

  @PostMapping("/register/student")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public ResponseEntity<AuthenticationResponse> registerStudent(
      @RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.registerStudent(request));
  }

  @PostMapping("/register/student/{schoolId}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<AuthenticationResponse> registerStudent(
      @RequestBody RegisterRequest request, @PathVariable UUID schoolId) {
    return ResponseEntity.ok(service.registerStudent(request, schoolId));
  }

  @PostMapping("/register/club")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public ResponseEntity<AuthenticationResponse> registerClub(
      @RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.registerClub(request));
  }

  @PostMapping("/register/club/{schoolId}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<AuthenticationResponse> registerClub(
      @RequestBody RegisterRequest request, @PathVariable UUID schoolId) {
    return ResponseEntity.ok(service.registerClub(request, schoolId));
  }

  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/changePassword")
  @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STUDENT', 'ROLE_CLUB')")
  public ResponseEntity<AuthenticationResponse> changePassword(
      @RequestBody AuthenticationRequest request) {
    return ResponseEntity.ok(service.changePassword(request));
  }

  @PostMapping("/forgotPassword")
  public ResponseEntity<AuthenticationResponse> forgotPassword(
      @RequestBody AuthenticationRequest request) throws MessagingException, UnsupportedEncodingException {
    return ResponseEntity.ok(service.forgotPassword(request));
  }

  @PostMapping("/register/superadmin")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public ResponseEntity<AuthenticationResponse> registerSuperAdmin(
      @RequestBody RegisterRequest request) {
    return ResponseEntity.ok(service.registerSuperAdmin(request));
  }

  @PostMapping("/signup")
  public ResponseEntity<String> signUp(
      @RequestBody RegisterRequest request) throws MessagingException, UnsupportedEncodingException {
    return service.signup(request);
  }

  @PutMapping("/acceptrequest/{id}")
  @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
  public ResponseEntity<String> acceptRequest(
      @PathVariable UUID id) throws MessagingException, UnsupportedEncodingException {
    return service.acceptRequest(id);
  }

  @PutMapping("/acceptrequest/{schoolId}/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  public ResponseEntity<String> acceptRequest(
      @PathVariable UUID id, @PathVariable UUID schoolId) throws MessagingException, UnsupportedEncodingException {
    return service.acceptRequest(id, schoolId);
  }
}
