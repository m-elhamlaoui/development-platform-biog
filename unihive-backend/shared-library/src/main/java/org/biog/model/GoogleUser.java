package org.biog.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "googleusers", schema = "public")
public class GoogleUser {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  @Column(name = "access_token", nullable = false)
  private String accessToken;

  @Column(name = "refresh_token", nullable = false)
  private String refreshToken;

  @Column(name = "token_expiry", nullable = false)
  private Date tokenExpiry;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "student_id", referencedColumnName = "id", nullable = false, unique = true)
  private Student student;

  @PrePersist
  protected void onCreate() {
    createdAt = Instant.now();
  }
}
