package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;

import java.util.List;
import java.util.UUID;

public interface ClubService {
    Club updateClub(UUID id ,Club newclub);
    void deleteClub(UUID id);
    Club getClub(UUID id);
    List<Club> getAll();
    School getSchoolByClub(UUID id);
    List<Event> getEventsByClub(UUID id);
    List<Student> getFollowers(UUID id);
}
