package org.biog.unihivebackend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    List<Student> findBySchool(School school);

    Optional<Student> findByEmail(String email);
}
