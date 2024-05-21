package org.biog.unihivebackend.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.service.implementation.EventRequest;

import com.google.api.services.calendar.model.Event;

public interface CalendarService {
    Event createEvent(EventRequest event, UUID studentId) throws IOException;

    Event getEvent(String eventId, UUID studentId) throws IOException;

    List<Event> getEvents(UUID studentId) throws IOException;

    void deleteEvent(String eventId, UUID studentId) throws IOException;
}
