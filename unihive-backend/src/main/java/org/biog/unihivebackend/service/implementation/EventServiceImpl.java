package org.biog.unihivebackend.service.implementation;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.repository.EventRepository;
import org.biog.unihivebackend.repository.SchoolRepository;
import org.biog.unihivebackend.service.EventService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

    private final SchoolRepository schoolRepository;
    private final EventRepository eventRepository;

    @Override
    public List<Event> getAll(UUID... schoolId) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            return eventRepository.findAll();
        }
        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
        if (!schoolId[0].equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to get all events in this school");
        }
        School school = schoolRepository.findById(schoolId[0]).orElseThrow(
                () -> new NotFoundException("School with id " + schoolId[0] + " not found"));
        return eventRepository.findBySchool(school);
    }

    @Override
    public Event addEvent(Event event, UUID... schoolId) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            return eventRepository.save(event);
        }
        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
        if (!schoolId[0].equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to add events in this school");
        }
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(UUID id, Event newevent, UUID... schoolId) throws AccessDeniedException {
        Event oldevent = eventRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Event with id " + id + " not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            oldevent.setEventName(newevent.getEventName());
            oldevent.setEventDescription(newevent.getEventDescription());
            oldevent.setEventCategory(newevent.getEventCategory());
            oldevent.setStartTime(newevent.getStartTime());
            oldevent.setEndTime(newevent.getEndTime());
            oldevent.setEventBanner(newevent.getEventBanner());
            oldevent.setEventRating(newevent.getEventRating());
            oldevent.setRatingCount(newevent.getRatingCount());
            oldevent.setClub(newevent.getClub());
            return eventRepository.save(oldevent);
        }
        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
        if (!schoolId[0].equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to update events in this school");
        }

        oldevent.setEventName(newevent.getEventName());
        oldevent.setEventDescription(newevent.getEventDescription());
        oldevent.setEventCategory(newevent.getEventCategory());
        oldevent.setStartTime(newevent.getStartTime());
        oldevent.setEndTime(newevent.getEndTime());
        oldevent.setEventBanner(newevent.getEventBanner());
        oldevent.setEventRating(newevent.getEventRating());
        oldevent.setRatingCount(newevent.getRatingCount());
        oldevent.setClub(newevent.getClub());
        return eventRepository.save(oldevent);
    }

    @Override
    public void deleteEvent(UUID id, UUID... schoolId) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            eventRepository.deleteById(id);
        } else {
            UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
            if (!schoolId[0].equals(loggedInUserSchoolId)) {
                throw new AccessDeniedException("You do not have permission to delete events in this school");
            }
            eventRepository.deleteById(id);
        }
    }

    @Override
    public Event getEvent(UUID id, UUID... schoolId) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            return eventRepository.findById(id).orElseThrow(
                    () -> new NotFoundException("Event with id " + id + " not found"));
        }
        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
        if (!schoolId[0].equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to get events in this school");
        }
        return eventRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Event with id " + id + " not found"));
    }

    @Override
    public Club getClubByEvent(UUID id, UUID... schoolId) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            return eventRepository.findById(id).orElseThrow(
                    () -> new NotFoundException("Event with id " + id + " not found")).getClub();
        }
        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
        if (!schoolId[0].equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to get clubs by events in this school");
        }
        return eventRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Event with id " + id + " not found")).getClub();
    }

}