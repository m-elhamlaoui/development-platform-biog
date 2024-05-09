package org.biog.unihivebackend.controller;

import lombok.AllArgsConstructor;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/event")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {
    private final EventService eventService;

    @GetMapping("/events")
    List<Event> getAllClubs() throws AccessDeniedException {
        return eventService.getAll();
    }
}
