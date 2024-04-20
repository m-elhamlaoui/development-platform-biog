package org.biog.unihivebackend.model;

import jakarta.persistence.*;
import java.time.Instant;
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
@Table(name = "admins", schema = "public")
public class Admin {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "school_id", referencedColumnName = "id", nullable = false)
  private School school;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
  private User user;

  @PrePersist
  protected void onCreate() {
    createdAt = Instant.now();
  }
}
