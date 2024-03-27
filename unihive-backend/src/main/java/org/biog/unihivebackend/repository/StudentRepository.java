package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
public interface StudentRepository extends JpaRepository<Student,UUID> {


}
