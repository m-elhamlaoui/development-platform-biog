package org.biog.unihivebackend.repository;

import java.util.Optional;
import java.util.UUID;
import org.biog.unihivebackend.model.School;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolRepository extends JpaRepository<School, UUID> {

    Optional<School> findBySchoolName(String schoolName);
}
