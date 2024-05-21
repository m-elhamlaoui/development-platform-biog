package org.biog.unihivebackend.service.implementation;

import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.repository.AdminRepository;
import org.biog.unihivebackend.service.AdminService;

import java.util.List;
import java.util.UUID;

public class AdminImplementation implements AdminService {
    private static AdminRepository adminRepository;

    @Override
    public List<Admin> getAll() {
        return adminRepository.findAll();
    }


    public Admin addAdmin(Admin admin) {

        return null;
    }

    @Override
    public Admin updateAdmin(UUID id, Admin newadmin) {
        return null;
    }

    @Override
    public void deleteAdmin(UUID id) {

    }

    @Override
    public Admin getAdmin(UUID id) {
        return null;
    }

    @Override
    public School getSchoolByAdmin(UUID id) {
        return null;
    }


}
