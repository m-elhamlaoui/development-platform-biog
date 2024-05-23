package org.biog.repository;

import java.util.List;
import java.util.UUID;

import org.biog.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, UUID> {

    List<Request> findBySchoolName(String schoolName);

}
