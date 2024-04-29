package org.biog.unihivebackend.controller;

import lombok.AllArgsConstructor;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.service.EventService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    private final EventService eventService;

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/events")
    List<Event> getAllEvents( ) {
        return eventService.getAllbyStudent();
    }

}
