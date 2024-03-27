package org.biog.unihivebackend.service;

import org.biog.unihivebackend.model.Admin;

import java.util.List;
import java.util.UUID;

public interface AdminService {
    List<Admin> getAll();
    Admin addAdmin(Admin admin);
    Admin updateAdmin(UUID id , Admin newadmin);
    void deleteAdmin(UUID id);
    Admin getAdmin(UUID id);

}
