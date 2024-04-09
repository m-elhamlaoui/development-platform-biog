package org.biog.unihivebackend.repository;

import java.util.UUID;
import org.biog.unihivebackend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, UUID> {}
