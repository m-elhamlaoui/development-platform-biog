package org.biog.unihivebackend.service.implementation;

import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.repository.EventRepository;
import org.biog.unihivebackend.service.EventService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository;

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public Event updateEvent(UUID id, Event newevent) {
        Event oldevent = eventRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Event with id " + id + " not found"));
        
        oldevent.setEventName(newevent.getEventName());
        oldevent.setEventDescription(newevent.getEventDescription());
        oldevent.setEventCategory(newevent.getEventCategory());
        oldevent.setStartTime(newevent.getStartTime());
        oldevent.setEndTime(newevent.getEndTime());
        oldevent.setEventBanner(newevent.getEventBanner());
        oldevent.setEventRating(newevent.getEventRating());
        oldevent.setRatingCount(newevent.getRatingCount());
        oldevent.setClub_id(newevent.getClub_id());
        return eventRepository.save(oldevent);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public void deleteEvent(UUID id) {
        eventRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public Event getEvent(UUID id) {
        return eventRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Event with id " + id + " not found")
        );
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public Club getClubByEvent(UUID id) {
        return eventRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Event with id " + id + " not found")
        ).getClub_id();
    }
    
}