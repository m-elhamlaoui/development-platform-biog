package org.biog.unihivebackend.controller;

import lombok.AllArgsConstructor;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.service.ClubService;
import org.biog.unihivebackend.service.EventService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.biog.unihivebackend.model.Student;

import org.biog.unihivebackend.model.Club;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    private final EventService eventService;
    private final ClubService clubService;


    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/events")
    List<Event> getAllEvents() {
        return eventService.getAllByStudent();
    }


    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/club/{id}")
    Club getClub(@PathVariable UUID id) {
        return clubService.getClubByStudent(id);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/club/{id}/events")
    List<Event> getAllEventsByClub(@PathVariable UUID id) {
        return clubService.getAllEventsByClub(id);
    }





}
