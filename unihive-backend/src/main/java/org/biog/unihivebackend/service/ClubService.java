package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;

import java.util.List;
import java.util.UUID;

public interface ClubService {
    Club updateClub(UUID id, Club newclub, UUID schoolId);

    void deleteClub(UUID id, UUID schoolId);

    Club getClub(UUID id, UUID schoolId);

    List<Club> getAll(UUID schoolId);

    School getSchoolByClub(UUID id);

    List<Event> getEventsByClub(UUID id, UUID schoolId);

    List<Student> getFollowers(UUID id, UUID schoolId);
}
