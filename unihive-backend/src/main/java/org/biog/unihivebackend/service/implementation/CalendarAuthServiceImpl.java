package org.biog.unihivebackend.service.implementation;

import com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.http.javanet.NetHttpTransport;
import jakarta.servlet.http.HttpServletRequest;

import org.biog.unihivebackend.config.CalendarConfig;
import org.biog.unihivebackend.model.GoogleUser;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.repository.GoogleUserRepository;
import org.biog.unihivebackend.repository.StudentRepository;
import org.biog.unihivebackend.service.CalendarAuthService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.UUID;

@Service
public class CalendarAuthServiceImpl implements CalendarAuthService {

    private final GoogleUserRepository googleUserRepository;
    private final StudentRepository studentRepository;
    private final NetHttpTransport httpTransport = new NetHttpTransport();
    private final CalendarConfig calendarConfig;
    private final GoogleAuthorizationCodeFlow flow;
    private UUID studId = null;

    public CalendarAuthServiceImpl(GoogleUserRepository googleUserRepository, StudentRepository studentRepository,
            CalendarConfig calendarConfig, GoogleAuthorizationCodeFlow flow) {
        this.googleUserRepository = googleUserRepository;
        this.studentRepository = studentRepository;
        this.calendarConfig = calendarConfig;
        this.flow = flow;
    }

    @Override
    public ResponseEntity<String> authorize(HttpServletRequest request, UUID studentId) {
        String redirectUri = getRedirectUri(request);
        AuthorizationCodeRequestUrl authorizationUrl = flow.newAuthorizationUrl().setRedirectUri(redirectUri);
        studId = studentId;
        HttpHeaders headers = new HttpHeaders();
        headers.add("Cross-Origin-Opener-Policy", "same-origin");
        headers.add("Cross-Origin-Embedder-Policy", "require-corp");

        return ResponseEntity.ok()
                .headers(headers)
                .body(authorizationUrl.build());
    }

    @Override
    public ResponseEntity<String> oauth2Callback(String code, HttpServletRequest request)
            throws IOException {
        String redirectUri = getRedirectUri(request);
        TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
        Credential credential = flow.createAndStoreCredential(response, studId.toString());

        GoogleUser userCredentials = new GoogleUser();
        userCredentials.setAccessToken(credential.getAccessToken());
        userCredentials.setRefreshToken(credential.getRefreshToken());
        userCredentials.setTokenExpiry(new Timestamp(credential.getExpirationTimeMilliseconds()));
        userCredentials.setStudent(studentRepository.findById(studId).get());
        googleUserRepository.save(userCredentials);

        calendarConfig.buildCalendarService(httpTransport, flow, studId);

        String successHtml = "<!DOCTYPE html>" +
                "<html lang='en'>" +
                "<head><title>Authorization Success</title></head>" +
                "<body>" +
                "<script>" +
                "  window.opener.postMessage({ type: 'oauth2callback', url: '" + redirectUri
                + "' }, window.location.origin);" +
                "  window.close();" +
                "</script>" +
                "</body>" +
                "</html>";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "text/html");
        return new ResponseEntity<>(successHtml, headers, HttpStatus.OK);
    }

    private String getRedirectUri(HttpServletRequest request) {
        return UriComponentsBuilder.fromHttpUrl(request.getRequestURL().toString())
                .replacePath("/calendar/oauth2callback")
                .toUriString();
    }

    @Override
    public ResponseEntity<String> revoke(UUID studentId) throws IOException {

        GoogleUser userCredentials = googleUserRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IOException("Student with id " + studentId + " not found"));

        Student student = userCredentials.getStudent();
        if (student != null) {
            student.setGoogleUser(null);
        }

        googleUserRepository.delete(userCredentials);

        boolean exists = googleUserRepository.existsById(userCredentials.getId());
        if (exists) {
            return new ResponseEntity<>("Failed to revoke credentials", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>("Credentials revoked", HttpStatus.OK);
    }
}