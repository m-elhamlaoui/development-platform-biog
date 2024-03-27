package org.biog.unihivebackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.biog.unihivebackend.models.User;

import java.util.UUID;
@Repository
public interface UserRepository extends JpaRepository<User,UUID> {


}
