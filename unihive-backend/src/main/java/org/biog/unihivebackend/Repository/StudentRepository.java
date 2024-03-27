package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.models.Student;

import java.util.List;
import java.util.UUID;

public interface StudentRepository {
    boolean addStudent(Student student);
    boolean updateStudent(Student student);
    boolean deleteStudent(UUID studentId);
    Student getStudentById(UUID studentId);
    List<Student> getAllStudents();

}
