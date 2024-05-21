package org.biog.unihivebackend.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.service.implementation.EventRequest;

import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;

public interface CalendarService {
    Event createEvent(EventRequest event, UUID studentId) throws IOException;

    EventRequest getEvent(String eventId, UUID studentId) throws IOException;

    List<EventRequest> getEvents(UUID studentId) throws IOException;

    void deleteEvent(String eventId, UUID studentId) throws IOException;

    Calendar getCalendarService(UUID studentId) throws IOException;
}
