package org.biog.unihivebackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.biog.unihivebackend.model.Admin;

import java.time.Instant;
import java.util.UUID;
import org.biog.unihivebackend.model.SuperAdmin;
public interface SuperAdminRepository extends JpaRepository<SuperAdmin,UUID>{


}
