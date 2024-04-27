package org.biog.unihivebackend.auth;

import ch.qos.logback.core.spi.ErrorCodes;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.biog.unihivebackend.config.JwtAuthenticationFilter;
import org.biog.unihivebackend.config.JwtService;
import org.biog.unihivebackend.email.EmailService;
import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Request;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.model.SuperAdmin;
import org.biog.unihivebackend.repository.AdminRepository;
import org.biog.unihivebackend.repository.ClubRepository;
import org.biog.unihivebackend.repository.RequestRepository;
import org.biog.unihivebackend.repository.SchoolRepository;
import org.biog.unihivebackend.repository.StudentRepository;
import org.biog.unihivebackend.repository.SuperAdminRepository;
import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final AdminRepository adminRepository;
  private final StudentRepository studentRepository;
  private final ClubRepository clubRepository;
  private final SchoolRepository schoolRepository;
  private final SuperAdminRepository superAdminRepository;
  private final RequestRepository requestRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationManager authenticationManager;
  private final EmailService emailService;

  public AuthenticationResponse registerSuperAdmin(RegisterRequest request) {
    var superAdmin = SuperAdmin
        .builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .build();
    superAdminRepository.save(superAdmin);
    var jwtToken = jwtService.generateToken(superAdmin);
    return AuthenticationResponse.builder().token(jwtToken).build();
  }

  public AuthenticationResponse registerAdmin(RegisterRequest request) {
    var admin = Admin
        .builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .lastName(request.getLastName())
        .firstName(request.getFirstName())
        .school(schoolRepository.findById(request.getSchool()).orElseThrow(
            () -> new NotFoundException(
                "School not found with id " + request.getSchool())))
        .build();
    adminRepository.save(admin);
    var jwtToken = jwtService.generateToken(admin);
    return AuthenticationResponse.builder().token(jwtToken).build();
  }

  public AuthenticationResponse registerStudent(RegisterRequest request) {
    var student = Student
        .builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .lastName(request.getLastName())
        .firstName(request.getFirstName())
        .cne(request.getCne())
        .numApogee(request.getNumApogee())
        .profileImage(request.getProfileImage())
        .school(schoolRepository.findById(request.getSchool()).orElseThrow(
            () -> new NotFoundException(
                "School not found with id " + request.getSchool())))
        .build();
    studentRepository.save(student);
    var jwtToken = jwtService.generateToken(student);
    return AuthenticationResponse.builder().token(jwtToken).build();
  }

  public AuthenticationResponse registerClub(RegisterRequest request) {
    var club = Club
        .builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .clubName(request.getClubName())
        .clubLogo(request.getClubLogo())
        .clubDescription(request.getClubDescription())
        .clubBanner(request.getClubBanner())
        .school(schoolRepository.findById(request.getSchool()).orElseThrow(
            () -> new NotFoundException(
                "School not found with id " + request.getSchool())))
        .build();
    clubRepository.save(club);
    var jwtToken = jwtService.generateToken(club);
    return AuthenticationResponse.builder().token(jwtToken).build();
  }

  public ResponseEntity<String> signup(RegisterRequest request) {
    var requestModel = Request
        .builder()
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .lastName(request.getLastName())
        .firstName(request.getFirstName())
        .cne(request.getCne())
        .numApogee(request.getNumApogee())
        .schoolCard(request.getSchoolCard())
        .build();

    requestRepository.save(requestModel);
    return ResponseEntity.ok("Sign Up request sent successfully");
  }

  public ResponseEntity<String> acceptRequest(UUID id, RegisterRequest request) {
    var requestModel = requestRepository.findById(id).orElseThrow(
        () -> new NotFoundException("Request not found with id " + id));
    var student = Student
        .builder()
        .email(request.getEmail())
        .password(request.getPassword())
        .lastName(request.getLastName())
        .firstName(request.getFirstName())
        .cne(request.getCne())
        .numApogee(request.getNumApogee())
        .school(schoolRepository.findById(request.getSchool()).orElseThrow(
            () -> new NotFoundException(
                "School not found with id " + request.getSchool())))
        .build();
    studentRepository.save(student);
    requestRepository.delete(requestModel);
    return ResponseEntity.ok("Request accepted successfully");
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.getEmail(),
            request.getPassword()));

    var admin = adminRepository.findByEmail(request.getEmail());
    if (admin.isPresent()) {
      var jwtToken = jwtService.generateToken(admin.get());
      return AuthenticationResponse.builder().token(jwtToken).build();
    } else {
      var student = studentRepository.findByEmail(request.getEmail());
      if (student.isPresent()) {
        var jwtToken = jwtService.generateToken(student.get());
        return AuthenticationResponse.builder().token(jwtToken).build();
      } else {
        var club = clubRepository.findByEmail(request.getEmail());
        if (club.isPresent()) {
          var jwtToken = jwtService.generateToken(club.get());
          return AuthenticationResponse.builder().token(jwtToken).build();
        } else {
          var superAdmin = superAdminRepository.findByEmail(request.getEmail());
          if (superAdmin.isPresent()) {
            var jwtToken = jwtService.generateToken(superAdmin.get());
            return AuthenticationResponse.builder().token(jwtToken).build();
          } else {
            return AuthenticationResponse.builder().token("INVALID_TOKEN").build();
          }
        }
      }
    }
  }

  public ResponseEntity<String> logout() {
    try {
      SecurityContextHolder.getContext().setAuthentication(null);
    } catch (Exception e) {
      ResponseEntity.badRequest().body("Logout failed");
    }
    return ResponseEntity.ok("Logout successful");
  }

  public AuthenticationResponse changePassword(AuthenticationRequest request) {
    var admin = adminRepository.findByEmail(jwtAuthFilter.getCurrentUserEmail());
    if (admin.isPresent()) {
      if (passwordEncoder.matches(
          request.getOldPassword(),
          admin.get().getPassword())) {
        admin
            .get()
            .setPassword(passwordEncoder.encode(request.getNewPassword()));
        adminRepository.save(admin.get());
        var jwtToken = jwtService.generateToken(admin.get());
        return AuthenticationResponse.builder().token(jwtToken).build();
      } else {
        return AuthenticationResponse.builder().token("INVALID_TOKEN").build();
      }
    } else {
      var student = studentRepository.findByEmail(jwtAuthFilter.getCurrentUserEmail());
      if (student.isPresent()) {
        if (passwordEncoder.matches(
            request.getOldPassword(),
            student.get().getPassword())) {
          student
              .get()
              .setPassword(passwordEncoder.encode(request.getNewPassword()));
          studentRepository.save(student.get());
          var jwtToken = jwtService.generateToken(student.get());
          return AuthenticationResponse.builder().token(jwtToken).build();
        } else {
          return AuthenticationResponse.builder().token("INVALID_TOKEN").build();
        }
      } else {
        var club = clubRepository.findByEmail(jwtAuthFilter.getCurrentUserEmail());
        if (club.isPresent()) {
          if (passwordEncoder.matches(
              request.getOldPassword(),
              club.get().getPassword())) {
            club
                .get()
                .setPassword(passwordEncoder.encode(request.getNewPassword()));
            clubRepository.save(club.get());
            var jwtToken = jwtService.generateToken(club.get());
            return AuthenticationResponse.builder().token(jwtToken).build();
          } else {
            return AuthenticationResponse.builder().token("INVALID_TOKEN").build();
          }
        } else {
          var superAdmin = superAdminRepository.findByEmail(jwtAuthFilter.getCurrentUserEmail());
          if (superAdmin.isPresent()) {
            if (passwordEncoder.matches(
                request.getOldPassword(),
                superAdmin.get().getPassword())) {
              superAdmin
                  .get()
                  .setPassword(passwordEncoder.encode(request.getNewPassword()));
              superAdminRepository.save(superAdmin.get());
              var jwtToken = jwtService.generateToken(superAdmin.get());
              return AuthenticationResponse.builder().token(jwtToken).build();
            } else {
              return AuthenticationResponse.builder().token("INVALID_TOKEN").build();
            }
          } else {
            return AuthenticationResponse.builder().token("INVALID_TOKEN").build();
          }
        }
      }
    }
  }

  public String generatePassayPassword() {
    PasswordGenerator gen = new PasswordGenerator();
    CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
    CharacterRule lowerCaseRule = new CharacterRule(lowerCaseChars);
    lowerCaseRule.setNumberOfCharacters(2);

    CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
    CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
    upperCaseRule.setNumberOfCharacters(2);

    CharacterData digitChars = EnglishCharacterData.Digit;
    CharacterRule digitRule = new CharacterRule(digitChars);
    digitRule.setNumberOfCharacters(2);

    CharacterData specialChars = new CharacterData() {
      public String getErrorCode() {
        return ErrorCodes.EMPTY_MODEL_STACK;
      }

      public String getCharacters() {
        return "!@#$%^&*()_+";
      }
    };
    CharacterRule splCharRule = new CharacterRule(specialChars);
    splCharRule.setNumberOfCharacters(2);

    String password = gen.generatePassword(
        10,
        splCharRule,
        lowerCaseRule,
        upperCaseRule,
        digitRule);
    return password;
  }

  public AuthenticationResponse forgotPassword(AuthenticationRequest request)
      throws MessagingException {
    var admin = adminRepository.findByEmail(request.getEmail());
    if (admin.isPresent()) {
      String newPassword = generatePassayPassword();
      admin.get().setPassword(passwordEncoder.encode(newPassword));
      emailService.sendEmail(
          request.getEmail(),
          "UniHive Corporation",
          "Your new password is " +
              newPassword +
              "." +
              " Please change it after logging in.");
      adminRepository.save(admin.get());
      var jwtToken = jwtService.generateToken(admin.get());
      return AuthenticationResponse.builder().token(jwtToken).build();
    } else {
      var student = studentRepository.findByEmail(request.getEmail());
      if (student.isPresent()) {
        String newPassword = generatePassayPassword();
        student.get().setPassword(passwordEncoder.encode(newPassword));
        emailService.sendEmail(
            request.getEmail(),
            "UniHive Corporation",
            "Your new password is " +
                newPassword +
                "." +
                " Please change it after logging in.");
        studentRepository.save(student.get());
        var jwtToken = jwtService.generateToken(student.get());
        return AuthenticationResponse.builder().token(jwtToken).build();
      } else {
        var club = clubRepository.findByEmail(request.getEmail());
        if (club.isPresent()) {
          String newPassword = generatePassayPassword();
          club.get().setPassword(passwordEncoder.encode(newPassword));
          emailService.sendEmail(
              request.getEmail(),
              "UniHive Corporation",
              "Your new password is " +
                  newPassword +
                  "." +
                  " Please change it after logging in.");
          clubRepository.save(club.get());
          var jwtToken = jwtService.generateToken(club.get());
          return AuthenticationResponse.builder().token(jwtToken).build();
        } else {
          var superAdmin = superAdminRepository.findByEmail(request.getEmail());
          if (superAdmin.isPresent()) {
            String newPassword = generatePassayPassword();
            superAdmin.get().setPassword(passwordEncoder.encode(newPassword));
            emailService.sendEmail(
                request.getEmail(),
                "UniHive Corporation",
                "Your new password is " +
                    newPassword +
                    "." +
                    " Please change it after logging in.");
            superAdminRepository.save(superAdmin.get());
            var jwtToken = jwtService.generateToken(superAdmin.get());
            return AuthenticationResponse.builder().token(jwtToken).build();
          } else {
            return AuthenticationResponse.builder().token("INVALID_TOKEN").build();
          }
        }
      }
    }
  }
}