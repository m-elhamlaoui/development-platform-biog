package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;

import java.util.List;
import java.util.UUID;

public interface SchoolService {
    List<School> getAll();
    School addSchool(School school);
    School updateSchool(UUID id , School newschool);
    void deleteSchool(UUID id);
    School getSchool(UUID id);
    List<Club> getClubsBySchool(UUID id);
    List<Student> getStudentsBySchool(UUID id);
    Admin getAdminBySchool(UUID id);
}
