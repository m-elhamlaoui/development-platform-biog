package org.biog.unihivebackend.service;

import java.util.List;
import java.util.UUID;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;

public interface EventService {
  List<Event> getAll();
  Event addEvent(Event event);
  Event updateEvent(UUID id, Event newevent);
  void deleteEvent(UUID id);
  Event getEvent(UUID id);
  Club getClubByEvent(UUID id);
}
