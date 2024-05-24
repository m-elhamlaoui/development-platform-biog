package org.biog.unihivebackend.config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;

import lombok.AllArgsConstructor;

import org.biog.unihivebackend.model.GoogleUser;
import org.biog.unihivebackend.repository.GoogleUserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Configuration
@AllArgsConstructor
public class CalendarConfig {

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES = Arrays.asList(CalendarScopes.CALENDAR,
            CalendarScopes.CALENDAR_EVENTS);
    private static final String CREDENTIALS_FILE_PATH = "/oauth2-client.json";
    private static final String APPLICATION_NAME = "UniHive";
    private final GoogleUserRepository googleUserRepository;

    @Bean
    public GoogleAuthorizationCodeFlow googleAuthorizationCodeFlow(NetHttpTransport httpTransport) throws IOException {
        InputStream in = CalendarConfig.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new IOException("Credentials file not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        return new GoogleAuthorizationCodeFlow.Builder(
                httpTransport, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
    }

    @Bean
    public NetHttpTransport netHttpTransport() throws GeneralSecurityException, IOException {
        return GoogleNetHttpTransport.newTrustedTransport();
    }

    public Calendar buildCalendarService(NetHttpTransport httpTransport, GoogleAuthorizationCodeFlow flow,
            UUID studentId)
            throws IOException {
        Credential credential = getStoredCredential(flow, studentId);
        if (credential == null) {
            throw new IOException("No stored credentials found");
        }
        return new Calendar.Builder(httpTransport, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    private Credential getStoredCredential(GoogleAuthorizationCodeFlow flow, UUID studentId)
            throws IOException {
        GoogleUser userCredentials = googleUserRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IOException("Student with id " + studentId + " not found"));
        if (userCredentials == null) {
            return null;
        }

        Credential credential = flow.loadCredential(userCredentials.getStudent().getId().toString());
        if (credential == null) {
            credential = new Credential.Builder(flow.getMethod())
                    .setTransport(flow.getTransport())
                    .setJsonFactory(flow.getJsonFactory())
                    .setTokenServerEncodedUrl(flow.getTokenServerEncodedUrl())
                    .setClientAuthentication(flow.getClientAuthentication())
                    .setRequestInitializer(flow.getRequestInitializer())
                    .build();
            credential.setAccessToken(userCredentials.getAccessToken());
            credential.setRefreshToken(userCredentials.getRefreshToken());
            credential.setExpirationTimeMilliseconds(userCredentials.getTokenExpiry().getTime());
        }
        return credential;
    }
}
