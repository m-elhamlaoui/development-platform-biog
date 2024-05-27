package org.biog.unihivebackend.service.implementation;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.config.CalendarConfig;
import org.biog.unihivebackend.service.CalendarService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final CalendarConfig calendarConfig;
    private final NetHttpTransport httpTransport = new NetHttpTransport();
    private final GoogleAuthorizationCodeFlow flow;

    @Override
    public EventRequest createEvent(EventRequest event, UUID studentId) throws IOException {
        Calendar calendar = getCalendarService(studentId);
        Event newevent = new Event()
                .setSummary(event.getTitle())
                .setLocation(event.getLocation())
                .setDescription(event.getDescription())
                .setStart(new EventDateTime().setDateTime(new DateTime(event.getStartTime())))
                .setEnd(new EventDateTime().setDateTime(new DateTime(event.getEndTime())))
                .setColorId(event.getColor())
                .setReminders(event.getReminder() == "True" ? new Event.Reminders().setUseDefault(true) : null);
        calendar.events().insert("primary", newevent).execute();

        EventRequest eventRequest = new EventRequest();
        eventRequest.setTitle(event.getTitle());
        eventRequest.setLocation(event.getLocation());
        eventRequest.setDescription(event.getDescription());
        eventRequest.setStartTime(event.getStartTime());
        eventRequest.setEndTime(event.getEndTime());
        eventRequest.setColor(event.getColor());
        eventRequest.setReminder(event.getReminder());
        return eventRequest;
    }

    @Override
    public EventRequest getEvent(String eventId, UUID studentId) throws IOException {
        Calendar calendar = getCalendarService(studentId);
        Event event = calendar.events().get("primary", eventId).execute();
        EventRequest eventRequest = new EventRequest();
        eventRequest.setId(event.getId());
        eventRequest.setTitle(event.getSummary());
        eventRequest.setLocation(event.getLocation());
        eventRequest.setDescription(event.getDescription());
        eventRequest.setStartTime(event.getStart().getDateTime().toString());
        eventRequest.setEndTime(event.getEnd().getDateTime().toString());
        eventRequest.setColor(event.getColorId());
        eventRequest.setReminder(event.getReminders().getUseDefault().toString());
        return eventRequest;
    }

    @Override
    public List<EventRequest> getEvents(UUID studentId) throws IOException {
        Calendar calendar = getCalendarService(studentId);
        List<Event> events = calendar.events().list("primary").execute().getItems();
        List<EventRequest> eventRequests = new ArrayList<EventRequest>();
        for (Event event : events) {
            if (event.getSummary().startsWith("UniHive:")) {
                EventRequest eventRequest = new EventRequest();
                eventRequest.setId(event.getId());
                eventRequest.setTitle(event.getSummary().replace("UniHive:", ""));
                eventRequest.setLocation(event.getLocation());
                eventRequest.setDescription(event.getDescription());
                eventRequest.setStartTime(event.getStart().getDateTime().toString());
                eventRequest.setEndTime(event.getEnd().getDateTime().toString());
                eventRequest.setColor(event.getColorId());
                eventRequest.setReminder(event.getReminders().getUseDefault().toString());
                eventRequests.add(eventRequest);
            }
        }
        return eventRequests;
    }

    @Override
    public void deleteEvent(String eventId, UUID studentId) throws IOException {
        Calendar calendar = getCalendarService(studentId);
        calendar.events().delete("primary", eventId).execute();
    }

    @Override
    public Calendar getCalendarService(UUID studentId) throws IOException {
        return calendarConfig.buildCalendarService(httpTransport, flow, studentId);
    }

    @Override
    public ResponseEntity<String> updateDescription(String eventId, String description, UUID studentId)
            throws IOException {
        Calendar calendar = getCalendarService(studentId);
        Event event = calendar.events().get("primary", eventId).execute();
        event.setDescription(description);
        calendar.events().update("primary", eventId, event).execute();
        return ResponseEntity.ok("Description updated successfully");
    }

}
