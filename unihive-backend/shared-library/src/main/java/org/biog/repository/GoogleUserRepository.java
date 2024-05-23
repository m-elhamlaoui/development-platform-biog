package org.biog.repository;

import java.util.Optional;
import java.util.UUID;
import org.biog.model.GoogleUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoogleUserRepository extends JpaRepository<GoogleUser, UUID> {

    Optional<GoogleUser> findByStudentId(UUID studentId);
}
