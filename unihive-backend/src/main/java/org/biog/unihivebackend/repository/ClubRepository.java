package org.biog.unihivebackend.repository;

import java.util.List;
import java.util.UUID;
import org.biog.unihivebackend.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository<Club, UUID> {

    List<Club> findBySchool(UUID schoolId);
}
