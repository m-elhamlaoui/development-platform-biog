package org.biog.repository;

import java.util.List;
import java.util.UUID;
//import org.biog.unihivebackend.model.School;
import org.biog.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface EventRepository extends JpaRepository<Event, UUID> {

   // @Query("SELECT e FROM Event e WHERE e.club.school = :school")
    //List<Event> findBySchool(@Param("school") School school);

    @Query("SELECT e FROM Event e")
    List<Event> findAll();
}
