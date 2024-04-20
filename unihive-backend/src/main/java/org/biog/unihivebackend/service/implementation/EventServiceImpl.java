package org.biog.unihivebackend.service.implementation;

import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.User;
import org.biog.unihivebackend.repository.AdminRepository;
import org.biog.unihivebackend.repository.EventRepository;
import org.biog.unihivebackend.service.EventService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {

    private final AdminRepository adminRepository;
    private final EventRepository eventRepository;

    @Override
    public List<Event> getAll(UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!isAdmin) {
            return eventRepository.findAll();
        }
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get all events in this school");
        }
        return eventRepository.findBySchool(schoolId);
    }

    @Override
    public Event addEvent(Event event, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to add events in this school");
        }
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(UUID id, Event newevent, UUID schoolId) {
        Event oldevent = eventRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Event with id " + id + " not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to update events in this school");
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
    public void deleteEvent(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to delete events in this school");
        }
        eventRepository.deleteById(id);
    }

    @Override
    public Event getEvent(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get events in this school");
        }
        return eventRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Event with id " + id + " not found"));
    }

    @Override
    public Club getClubByEvent(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get clubs by events in this school");
        }
        return eventRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Event with id " + id + " not found")).getClub();
    }

}