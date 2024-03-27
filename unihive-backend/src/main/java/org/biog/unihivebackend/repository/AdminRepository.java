package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.UUID;

public interface AdminRepository extends JpaRepository<Admin,UUID> {
}
