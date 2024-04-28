package org.biog.unihivebackend.service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.model.Request;

public interface RequestService {
    List<Request> getAll(UUID... schoolId) throws AccessDeniedException;

    Request updateRequest(UUID id, Request newRequest, UUID... schoolId) throws AccessDeniedException;

    void deleteRequest(UUID id, UUID... schoolId) throws AccessDeniedException;

    Request getRequest(UUID id, UUID... schoolId) throws AccessDeniedException;
}
