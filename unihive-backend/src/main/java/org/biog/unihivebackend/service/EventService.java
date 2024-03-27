package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface EventService {

    Event addEvent(Event event);
    Event updateEvent(UUID id, Event newevent);
    void deleteEvent(UUID id);
    Event getEvent(UUID id);
    Club getClubByEvent(UUID id);
}
