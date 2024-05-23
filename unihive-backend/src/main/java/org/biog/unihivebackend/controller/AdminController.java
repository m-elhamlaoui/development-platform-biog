package org.biog.unihivebackend.controller;

import java.io.UnsupportedEncodingException;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;

import org.biog.unihivebackend.auth.AuthenticationRequest;
import org.biog.unihivebackend.auth.AuthenticationResponse;
import org.biog.unihivebackend.auth.AuthenticationService;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.Request;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.service.AdminService;
import org.biog.unihivebackend.service.ClubService;
import org.biog.unihivebackend.service.EventService;
import org.biog.unihivebackend.service.RequestService;
import org.biog.unihivebackend.service.StudentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

  private final StudentService studentService;
  private final ClubService clubService;
  private final EventService eventService;
  private final RequestService requestService;
  private final AdminService AdminService;
  private final AuthenticationService authenticationService;

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/students/{schoolId}")
  List<Student> getAllStudents(@PathVariable UUID schoolId) throws AccessDeniedException {
    return studentService.getAll(schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PutMapping("/upstudent/{schoolId}/{id}")
  Student updateStudent(@PathVariable UUID id, @RequestBody Student newstudent, @PathVariable UUID schoolId)
      throws AccessDeniedException {
    return studentService.updateStudent(id, newstudent, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("/delstudent/{schoolId}/{id}")
  void deleteStudent(@PathVariable UUID id, @PathVariable UUID schoolId) throws AccessDeniedException {
    studentService.deleteStudent(id, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/student/{schoolId}/{id}")
  Student getStudent(@PathVariable UUID id, @PathVariable UUID schoolId) throws AccessDeniedException {
    return studentService.getStudent(id, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/clubs/{schoolId}")
  List<Club> getAllClubs(@PathVariable UUID schoolId) throws AccessDeniedException {
    return clubService.getAll(schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PutMapping("/upclub/{schoolId}/{id}")
  Club updateClub(@PathVariable UUID id, @RequestBody Club newclub, @PathVariable UUID schoolId)
      throws AccessDeniedException {
    return clubService.updateClub(id, newclub, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("/delclub/{schoolId}/{id}")
  void deleteClub(@PathVariable UUID id, @PathVariable UUID schoolId) throws AccessDeniedException {
    clubService.deleteClub(id, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/club/{schoolId}/{id}")
  Club getClub(@PathVariable UUID id, @PathVariable UUID schoolId) throws AccessDeniedException {
    return clubService.getClub(id, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping("/addfollowers/{schoolId}/{id}")
  Club addFollowers(@PathVariable UUID id, @RequestBody List<Student> followers, @PathVariable UUID schoolId)
      throws AccessDeniedException {
    return clubService.addFollowers(id, followers, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("/delfollowers/{schoolId}/{id}")
  void deleteFollowers(@PathVariable UUID id, @RequestBody List<Student> followers, @PathVariable UUID schoolId)
      throws AccessDeniedException {
    clubService.deleteFollowers(id, followers, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/events/{schoolId}")
  List<Event> getAllEvents(@PathVariable UUID schoolId) throws AccessDeniedException {
    return eventService.getAll(schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PutMapping("/upevent/{schoolId}/{id}")
  Event updateEvent(@PathVariable UUID id, @RequestBody Event newevent, @PathVariable UUID schoolId)
      throws AccessDeniedException {
    return eventService.updateEvent(id, newevent, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("/delevent/{schoolId}/{id}")
  void deleteEvent(@PathVariable UUID id, @PathVariable UUID schoolId) throws AccessDeniedException {
    eventService.deleteEvent(id, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/event/{schoolId}/{id}")
  Event getEvent(@PathVariable UUID id, @PathVariable UUID schoolId) throws AccessDeniedException {
    return eventService.getEvent(id, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PostMapping("/addevent/{schoolId}")
  Event addEvent(@RequestBody Event event, @PathVariable UUID schoolId) throws AccessDeniedException {
    return eventService.addEvent(event, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/requests/{schoolId}")
  List<Request> getAllRequests(@PathVariable UUID schoolId) throws AccessDeniedException {
    return requestService.getAll(schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PutMapping("/uprequest/{schoolId}/{id}")
  Request updateRequest(@PathVariable UUID id, @RequestBody Request newrequest, @PathVariable UUID schoolId)
      throws AccessDeniedException {
    return requestService.updateRequest(id, newrequest, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("/delrequest/{schoolId}/{id}")
  void deleteRequest(@PathVariable UUID id, @PathVariable UUID schoolId)
      throws AccessDeniedException, UnsupportedEncodingException, MessagingException {
    requestService.deleteRequest(id, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/request/{schoolId}/{id}")
  Request getRequest(@PathVariable UUID id, @PathVariable UUID schoolId) throws AccessDeniedException {
    return requestService.getRequest(id, schoolId);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/allcounts/{schoolId}")
  List<Integer> getAllCounts(@PathVariable UUID schoolId) throws AccessDeniedException {
    return List.of(studentService.getAll(schoolId).size(), clubService.getAll(schoolId).size(),
        eventService.getAll(schoolId).size(), requestService.getAll(schoolId).size());
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/{email}")
  Admin getAdminByEmail(@PathVariable String email) {
    return AdminService.getAdminByEmail(email);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PutMapping("/upemail/{id}")
  AuthenticationResponse updateAdminEmail(@PathVariable UUID id, @RequestParam String email) {
    return AdminService.updateAdminEmail(id, email);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @PutMapping("/uppassword")
  AuthenticationResponse updateAdminPassword(@RequestBody AuthenticationRequest password) {
    return authenticationService.changePassword(password);
  }

  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("/school/{email}")
  School getSchoolByAdmin(@PathVariable String email) {
    return AdminService.getSchoolByAdmin(email);
  }
}
