package org.biog.unihivebackend.model;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "clubs", schema = "public")
public class Club {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "club_name", nullable = false, unique = true)
  private String clubName;

  @Column(name = "club_logo", nullable = false)
  private String clubLogo;

  @Column(name = "club_description", nullable = false)
  private String clubDescription;

  @Column(name = "club_banner", nullable = false)
  private String clubBanner;

  @Column(name = "club_rating")
  private float clubRating;

  @Column(name = "rating_count")
  private int ratingCount;

  @ManyToMany
  @JoinTable(name = "follows", joinColumns = @JoinColumn(name = "club_id"), inverseJoinColumns = @JoinColumn(name = "student_id"))
  private List<Student> students;

  @OneToMany(mappedBy = "club")
  private List<Event> events;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "school_id", referencedColumnName = "id", nullable = false)
  private School school;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
  private User user;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @PrePersist
  protected void onCreate() {
    createdAt = Instant.now();
  }
}
