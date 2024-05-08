package org.biog.unihivebackend.service.implementation;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Request;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.repository.RequestRepository;
import org.biog.unihivebackend.repository.SchoolRepository;
import org.biog.unihivebackend.service.RequestService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final SchoolRepository schoolRepository;

    @Override
    public List<Request> getAll(UUID... schoolId) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            return requestRepository.findAll();
        }
        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
        if (!schoolId[0].equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to get all clubs in this school");
        }
        School school = schoolRepository.findById(schoolId[0]).orElseThrow(
                () -> new NotFoundException("School with id " + schoolId[0] + " not found"));
        return requestRepository.findBySchoolName(school.getSchoolName());
    }

    @Override
    public Request updateRequest(UUID id, Request newrequest, UUID... schoolId) throws AccessDeniedException {
        Request oldrequest = requestRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Request with id " + id + " not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            oldrequest.setCne(newrequest.getCne());
            oldrequest.setFirstName(newrequest.getFirstName());
            oldrequest.setLastName(newrequest.getLastName());
            oldrequest.setSchoolName(newrequest.getSchoolName());
            oldrequest.setEmail(newrequest.getEmail());
            oldrequest.setNumApogee(newrequest.getNumApogee());
            return requestRepository.save(oldrequest);
        }

        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
        if (!schoolId[0].equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to update this request");
        }
        oldrequest.setCne(newrequest.getCne());
        oldrequest.setFirstName(newrequest.getFirstName());
        oldrequest.setLastName(newrequest.getLastName());
        oldrequest.setSchoolName(newrequest.getSchoolName());
        oldrequest.setEmail(newrequest.getEmail());
        oldrequest.setNumApogee(newrequest.getNumApogee());
        return requestRepository.save(oldrequest);
    }

    @Override
    public void deleteRequest(UUID id, UUID... schoolId) throws AccessDeniedException {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Request with id " + id + " not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            requestRepository.delete(request);
        } else {

            UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
            if (!schoolId[0].equals(loggedInUserSchoolId)) {
                throw new AccessDeniedException("You do not have permission to delete this request");
            }
            requestRepository.delete(request);
        }
    }

    @Override
    public Request getRequest(UUID id, UUID... schoolId) throws AccessDeniedException {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Request with id " + id + " not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin) {
            return request;
        }

        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
        if (!schoolId[0].equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to get this request");
        }
        return request;
    }

}
