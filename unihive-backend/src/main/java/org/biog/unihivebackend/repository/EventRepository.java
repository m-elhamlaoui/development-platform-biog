package org.biog.unihivebackend.repository;

import java.util.UUID;
import org.biog.unihivebackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, UUID> {}
