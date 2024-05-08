package org.biog.unihivebackend.controller;

import java.nio.file.AccessDeniedException;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.service.StudentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

  private final StudentService studentService;

  @PreAuthorize("hasAnyRole('ROLE_SUPER_ADMIN', 'ROLE_ADMIN')")
  @PutMapping("upstudent/{schoolId}/{id}")
  public Student updateStudent(@PathVariable UUID id, @RequestBody Student newstudent, @PathVariable UUID schoolId)
      throws AccessDeniedException {
    return studentService.updateStudent(id, newstudent, schoolId);
  }
}
