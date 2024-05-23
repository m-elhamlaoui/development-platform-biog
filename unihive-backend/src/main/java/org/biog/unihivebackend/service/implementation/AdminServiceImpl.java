package org.biog.unihivebackend.service.implementation;

import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.auth.AuthenticationResponse;
import org.biog.unihivebackend.config.JwtService;
import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.repository.AdminRepository;
import org.biog.unihivebackend.repository.SchoolRepository;
import org.biog.unihivebackend.service.AdminService;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final SchoolRepository schoolRepository;
    private final JwtService jwtService;

    @Override
    public List<Admin> getAll() {
        return adminRepository.findAll();
    }

    @Override
    public Admin updateAdmin(UUID id, Admin newadmin) {
        Admin oldadmin = adminRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Admin with id " + id + " not found"));

        oldadmin.setEmail(newadmin.getEmail());
        oldadmin.setFirstName(newadmin.getFirstName());
        oldadmin.setLastName(newadmin.getLastName());
        oldadmin.setSchool(schoolRepository.findById(newadmin.getSchool().getId()).orElseThrow(
                () -> new NotFoundException(
                        "School not found with id " + newadmin.getSchool().getId())));
        return adminRepository.save(oldadmin);
    }

    @Override
    public void deleteAdmin(UUID id) {
        adminRepository.deleteById(id);
    }

    @Override
    public Admin getAdmin(UUID id) {
        return adminRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Admin with id " + id + " not found"));
    }

    @Override
    public School getSchoolByAdmin(UUID id) {
        return adminRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Admin with id " + id + " not found")).getSchool();
    }

    @Override
    public AuthenticationResponse updateAdminEmail(UUID id, String email) {
        Admin admin = adminRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Admin with id " + id + " not found"));
        admin.setEmail(email);
        adminRepository.save(admin);
        var jwtToken = jwtService.generateToken(admin);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}