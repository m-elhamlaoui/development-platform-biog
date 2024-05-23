package org.biog.repository;

import java.util.Optional;
import java.util.UUID;
import org.biog.model.SuperAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuperAdminRepository extends JpaRepository<SuperAdmin, UUID> {

    Optional<SuperAdmin> findByEmail(String email);
}
