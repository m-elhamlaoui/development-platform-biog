package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;

import java.util.List;
import java.util.UUID;

public interface StudentService{
        List<Student> getAll();
        Student updateStudent(UUID id ,Student newstudent);
        void deleteStudent(UUID id);
        Student getStudent(UUID id);
        School getSchoolByStudent(UUID id);
        List<Club> getClubsByFollower(UUID id);
}

