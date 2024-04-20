package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

public interface StudentService {
        List<Student> getAll(UUID schoolId);

        Student updateStudent(UUID id, Student newstudent, UUID schoolId) throws AccessDeniedException;

        void deleteStudent(UUID id, UUID schoolId);

        Student getStudent(UUID id, UUID schoolId);

        School getSchoolByStudent(UUID id, UUID schoolId);

        List<Club> getClubsByFollower(UUID id, UUID schoolId);
}
