package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.models.Admin;

import java.time.Instant;
import java.util.UUID;

public interface AdminRepository {
    boolean addAdmin(Admin admin);
    boolean updateAdmin(Admin admin);
    boolean deleteAdmin(UUID adminId);
    Admin getAdminById(UUID adminId);
    School getAdminSchool(UUID adminId);

}
