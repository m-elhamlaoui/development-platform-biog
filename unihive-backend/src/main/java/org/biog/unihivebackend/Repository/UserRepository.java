package org.biog.unihivebackend.repository;

import org.biog.unihivebackend.models.User;

import java.util.UUID;

public interface UserRepository {
    boolean addUser(User user);
    boolean updateUser(User user);
    boolean deleteUser(UUID userId);
    User getUserById(UUID userId);

}
