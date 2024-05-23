package org.biog.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.biog.model.School;
import org.biog.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    List<Student> findBySchool(School school);

    Optional<Student> findByEmail(String email);
}
