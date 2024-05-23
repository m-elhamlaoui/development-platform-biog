package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.School;

import java.util.List;
import java.util.UUID;

public interface AdminService {
    List<Admin> getAll();

    Admin updateAdmin(UUID id, Admin newadmin);

    void deleteAdmin(UUID id);

    Admin getAdmin(UUID id);

    School getSchoolByAdmin(UUID id);
}
