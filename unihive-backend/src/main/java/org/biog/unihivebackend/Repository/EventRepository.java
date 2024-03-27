package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.models.Club;
import org.biog.unihivebackend.models.Event;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface EventRepository {
    boolean addEvent(Event event);
    boolean updateEvent(Event event);
    boolean deleteEvent(UUID eventId);
    Event getEventById(UUID eventId);
    List<Event> getAllEventsByClub(UUID clubId);
    List<Event> getEventsByLocation(String location);
    List<Event> getEventsByCategory(String category);
    List<Event> getEventsByDate(Instant startTime, Instant endTime);
    List<Club> searchClubs(String keywords);
}
