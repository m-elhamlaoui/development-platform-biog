package org.biog.unihivebackend.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.service.implementation.EventRequest;
import org.springframework.http.ResponseEntity;

import com.google.api.services.calendar.Calendar;

public interface CalendarService {
    EventRequest createEvent(EventRequest event, UUID studentId) throws IOException;

    EventRequest getEvent(String eventId, UUID studentId) throws IOException;

    List<EventRequest> getEvents(UUID studentId) throws IOException;

    void deleteEvent(String eventId, UUID studentId) throws IOException;

    Calendar getCalendarService(UUID studentId) throws IOException;

    ResponseEntity<String> updateDescription(String eventId, String description, UUID studentId) throws IOException;
}
