package org.biog.unihivebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;

import java.util.List;
import java.util.UUID;

public interface ClubRepository extends JpaRepository<Club,UUID>{


}
