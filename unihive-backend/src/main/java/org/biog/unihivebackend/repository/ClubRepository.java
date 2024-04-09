package org.biog.unihivebackend.repository;

import java.util.UUID;
import org.biog.unihivebackend.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepository extends JpaRepository<Club, UUID> {}
