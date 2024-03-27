package org.biog.unihivebackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.biog.unihivebackend.model.School;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.biog.unihivebackend.model.School;
public interface SchoolRepository extends JpaRepository<School,UUID>{


}
