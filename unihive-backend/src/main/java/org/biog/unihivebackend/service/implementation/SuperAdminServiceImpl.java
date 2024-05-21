package org.biog.unihivebackend.service.implementation;

import java.util.List;
import org.biog.unihivebackend.auth.AuthenticationResponse;
import org.biog.unihivebackend.config.JwtService;
import org.biog.unihivebackend.model.SuperAdmin;
import org.biog.unihivebackend.repository.SuperAdminRepository;
import org.biog.unihivebackend.service.SuperAdminService;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SuperAdminServiceImpl implements SuperAdminService {
    private final SuperAdminRepository superAdminRepository;
    private final JwtService jwtService;

    @Override
    public List<SuperAdmin> getAll() {
        return superAdminRepository.findAll();
    }

    @Override
    public AuthenticationResponse updateSuperAdminEmail(String email) {
        SuperAdmin superAdmin = superAdminRepository.findAll().get(0);
        superAdmin.setEmail(email);
        superAdminRepository.save(superAdmin);
        var jwtToken = jwtService.generateToken(superAdmin);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}