package org.biog.unihivebackend.controller;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;

import org.biog.unihivebackend.service.CalendarAuthService;
import org.biog.unihivebackend.service.CalendarService;
import org.biog.unihivebackend.service.implementation.EventRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.google.api.services.calendar.model.Event;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@AllArgsConstructor
@RequestMapping("/calendar")
@CrossOrigin(origins = "http://localhost:5173")
public class CalendarController {

    private final CalendarService calendarService;
    private final CalendarAuthService calendarAuthService;

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/events/{studentId}")
    public List<EventRequest> getEvents(@PathVariable UUID studentId) throws IOException {
        return calendarService.getEvents(studentId);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @PostMapping("/addevent/{studentId}")
    public Event createEvent(
            @RequestBody EventRequest event, @PathVariable UUID studentId) throws IOException {

        return calendarService.createEvent(event, studentId);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @DeleteMapping("/delevent/{studentId}/{id}")
    public void deleteEvent(
            @PathVariable String id, @PathVariable UUID studentId) throws IOException {

        calendarService.deleteEvent(id, studentId);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/event/{studentId}/{id}")
    public EventRequest getEvent(
            @PathVariable String id, @PathVariable UUID studentId) throws IOException {

        return calendarService.getEvent(id, studentId);
    }

    @GetMapping("/authorize/{studentId}")
    public ResponseEntity<String> authorize(HttpServletRequest request, @PathVariable UUID studentId)
            throws IOException, GeneralSecurityException {
        return calendarAuthService.authorize(request, studentId);
    }

    @GetMapping("/oauth2callback")
    public ResponseEntity<String> oauth2Callback(@RequestParam String code, HttpServletRequest request)
            throws IOException, GeneralSecurityException {
        return calendarAuthService.oauth2Callback(code, request);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @DeleteMapping("/revoke/{studentId}")
    public ResponseEntity<String> revoke(@PathVariable UUID studentId) throws IOException {
        return calendarAuthService.revoke(studentId);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/get/{studentId}")
    public ResponseEntity<String> get(@PathVariable UUID studentId) throws IOException {
        calendarService.getCalendarService(studentId);
        return ResponseEntity.ok("Calendar service created");
    }
}