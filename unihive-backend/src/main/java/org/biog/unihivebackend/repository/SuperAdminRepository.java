package org.biog.unihivebackend.repository;

import java.util.UUID;
import org.biog.unihivebackend.model.SuperAdmin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuperAdminRepository extends JpaRepository<SuperAdmin, UUID> {}
