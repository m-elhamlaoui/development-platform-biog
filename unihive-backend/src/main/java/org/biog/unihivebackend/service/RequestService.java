package org.biog.unihivebackend.service;

import java.io.UnsupportedEncodingException;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.model.Request;

import jakarta.mail.MessagingException;

public interface RequestService {
    List<Request> getAll(UUID... schoolId) throws AccessDeniedException;

    Request updateRequest(UUID id, Request newrequest, UUID... schoolId) throws AccessDeniedException;

    void deleteRequest(UUID id, UUID... schoolId)
            throws AccessDeniedException, UnsupportedEncodingException, MessagingException;

    Request getRequest(UUID id, UUID... schoolId) throws AccessDeniedException;
}
