package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.models.Admin;

import java.time.Instant;
import java.util.UUID;

public interface AdminRepository {
    boolean addSuperAdmin(SuperAdmin admin);
    boolean updateSuperAdmin(SuperAdmin admin);
    boolean deleteSuperAdmin(UUID adminId);

}
