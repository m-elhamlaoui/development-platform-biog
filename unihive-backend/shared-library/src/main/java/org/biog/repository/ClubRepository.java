package org.biog.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.biog.model.Club;
import org.biog.model.School;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository<Club, UUID> {

    List<Club> findBySchool(School school);

    Optional<Club> findByEmail(String email);

}
