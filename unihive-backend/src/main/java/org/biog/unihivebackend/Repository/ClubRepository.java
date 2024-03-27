package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.models.Club;
import org.biog.unihivebackend.models.Event;
import org.biog.unihivebackend.models.School;
import org.biog.unihivebackend.models.Student;

import java.util.List;
import java.util.UUID;

public interface ClubRepository {

    boolean addClub(Club club);

    boolean updateClub(Club club);
    boolean deleteClub(UUID clubId);
    Club getClubById(UUID clubId);
    List<Club> getAllClubs();
    School getSchool(UUID clubId);
    List<Event> getAllEventsByClub(UUID clubId);
    List<Student> getFollowers(UUID clubId);
    List<Club> getClubsBySchool(UUID schoolId);
    List<Club> getClubsByCategory(String category);
    List<Club> getClubsByLocation(String city);
    boolean followClub(UUID clubId, UUID userId);
    boolean unfollowClub(UUID clubId, UUID userId);
    List<Club> searchClubs(String keywords);
}
