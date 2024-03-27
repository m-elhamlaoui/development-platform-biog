package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.School;

import java.util.List;
import java.util.UUID;

public interface SchoolService {
    School addSchool(School school);
    School updateSchool(UUID id , School newschool);
    void deleteSchool(UUID id);
    School getSchool(UUID id);
    List<Club> getClubsBySchool(UUID id);
}
