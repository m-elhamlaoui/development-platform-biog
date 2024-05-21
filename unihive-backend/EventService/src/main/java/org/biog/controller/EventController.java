package org.biog.controller;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.model.Event;
import org.biog.service.EventService;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/events")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {
    private final EventService eventService;

    @GetMapping
    List<Event> getAllEvents() throws AccessDeniedException {
        return eventService.getAll();
    }

    @PutMapping("/upevent/{id}")
    Event updateEvent(@PathVariable UUID id, @RequestBody Event newevent) throws AccessDeniedException {
        return eventService.updateEvent(id, newevent);
    }

    @DeleteMapping("/delevent/{id}")
    void deleteEvent(@PathVariable UUID id) throws AccessDeniedException {
        eventService.deleteEvent(id);
    }

    @GetMapping("/event/{id}")
    Event getEvent(@PathVariable UUID id) throws AccessDeniedException {
        return eventService.getEvent(id);
    }

    @PostMapping("/addevent")
    Event addEvent(@RequestBody Event event) throws AccessDeniedException {
        return eventService.addEvent(event);
    }
}
