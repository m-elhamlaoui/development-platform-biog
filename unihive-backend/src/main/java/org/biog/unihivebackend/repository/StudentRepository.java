package org.biog.unihivebackend.repository;

import java.util.UUID;
import org.biog.unihivebackend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, UUID> {}
