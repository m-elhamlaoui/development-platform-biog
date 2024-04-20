package org.biog.unihivebackend.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "students", schema = "public")
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @Column(name = "cne", nullable = false, unique = true)
  private String cne;

  @Column(name = "num_apogee", nullable = false, unique = true)
  private int numApogee;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "profile_image", nullable = false)
  private String profileImage;

  @ManyToMany
  @JoinTable(name = "follows", joinColumns = @JoinColumn(name = "student_id"), inverseJoinColumns = @JoinColumn(name = "club_id"))
  private List<Club> clubs;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "school_id", referencedColumnName = "id", nullable = false)
  private School school;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
  private User user;

  @PrePersist
  protected void onCreate() {
    createdAt = Instant.now();
  }

  public List<Club> getClubsBySchool(UUID schoolId) {
    return clubs.stream()
        .filter(club -> club.getSchool().getId().equals(schoolId))
        .collect(Collectors.toList());
  }
}
