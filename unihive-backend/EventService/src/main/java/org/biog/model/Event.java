package org.biog.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//import org.biog.unihivebackend.model.Club;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "events", schema = "public")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "event_category", nullable = false)
    private String eventCategory;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Column(name = "event_description", nullable = false)
    private String eventDescription;

    @Column(name = "event_location", nullable = false)
    private String eventLocation;

    @Column(name = "event_banner", nullable = false)
    private String eventBanner;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "event_rating")
    private float eventRating;

    @Column(name = "rating_count")
    private int ratingCount;

   /* @ManyToOne
    @JoinColumn(name = "club_id", referencedColumnName = "id", nullable = false)
    private Club club;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
    }*/
}
