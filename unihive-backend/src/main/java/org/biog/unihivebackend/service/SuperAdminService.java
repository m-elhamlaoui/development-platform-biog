package org.biog.unihivebackend.service;

import java.util.List;

import org.biog.unihivebackend.auth.AuthenticationResponse;
import org.biog.unihivebackend.model.SuperAdmin;

public interface SuperAdminService {
    List<SuperAdmin> getAll();

    AuthenticationResponse updateSuperAdminEmail(String email);
}
