package org.biog.service;


import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;
//import org.biog.unihivebackend.model.Club;
import org.biog.model.Event;

public interface EventService {
    List<Event> getAllByStudent();
    List<Event> getAll(UUID... schoolId) throws AccessDeniedException;

    Event addEvent(Event event, UUID... schoolId) throws AccessDeniedException;

    Event updateEvent(UUID id, Event newevent, UUID... schoolId) throws AccessDeniedException;

    void deleteEvent(UUID id, UUID... schoolId) throws AccessDeniedException;

    Event getEvent(UUID id, UUID... schoolId) throws AccessDeniedException;

    //Club getClubByEvent(UUID id, UUID... schoolId) throws AccessDeniedException;
}

