package org.biog.unihivebackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.biog.unihivebackend.model.Event;

public interface EventRepository extends JpaRepository<Event,UUID> {

}
