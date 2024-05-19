package org.biog.unihivebackend.service;

import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.UUID;

import org.springframework.http.ResponseEntity;

public interface CalendarAuthService {

    ResponseEntity<String> authorize(HttpServletRequest request, UUID studentId)
            throws IOException, GeneralSecurityException;

    ResponseEntity<String> oauth2Callback(String code, HttpServletRequest request)
            throws IOException, GeneralSecurityException;
}
