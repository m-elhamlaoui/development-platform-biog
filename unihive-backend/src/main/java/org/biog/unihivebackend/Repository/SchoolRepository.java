package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.models.School;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface SchoolRepository {

    boolean addSchool(School school);

    boolean updateSchool(School school);

    boolean deleteSchool(UUID schoolId);

    School getSchoolById(UUID schoolId);

}
