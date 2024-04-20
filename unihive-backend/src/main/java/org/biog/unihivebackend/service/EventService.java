package org.biog.unihivebackend.service;

import java.util.List;
import java.util.UUID;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;

public interface EventService {
  List<Event> getAll(UUID schoolId);

  Event addEvent(Event event, UUID schoolId);

  Event updateEvent(UUID id, Event newevent, UUID schoolId);

  void deleteEvent(UUID id, UUID schoolId);

  Event getEvent(UUID id, UUID schoolId);

  Club getClubByEvent(UUID id, UUID schoolId);
}
