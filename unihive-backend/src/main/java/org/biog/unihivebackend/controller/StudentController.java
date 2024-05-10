package org.biog.unihivebackend.controller;

import lombok.AllArgsConstructor;

import org.biog.unihivebackend.auth.AuthenticationRequest;
import org.biog.unihivebackend.auth.AuthenticationResponse;
import org.biog.unihivebackend.auth.AuthenticationService;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.service.ClubService;
import org.biog.unihivebackend.service.EventService;
import org.biog.unihivebackend.service.StudentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    private final EventService eventService;
    private final ClubService clubService;
    private final StudentService studentService;
    private final AuthenticationService authenticationService;

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/{id}")
    Student getStudent(@PathVariable UUID id) throws AccessDeniedException {
        return studentService.getStudent(id);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/email/{email}")
    Student getStudentByEmail(@PathVariable String email) {
        return studentService.getStudentByEmail(email);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/events")
    List<Event> getAllEvents() {
        return eventService.getAllByStudent();
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/club/{id}")
    Club getClub(@PathVariable UUID id) {
        return clubService.getClubByStudent(id);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @GetMapping("/club/{id}/events")
    List<Event> getAllEventsByClub(@PathVariable UUID id) {
        return clubService.getAllEventsByClub(id);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @PutMapping("/upemail/{id}")
    Student updateStudentByEmail(@PathVariable UUID id, @RequestBody String email) {
        return studentService.updateStudentEmail(id, email);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @PutMapping("/upprofileimage/{id}")
    Student updateStudentProfileImage(@PathVariable UUID id, @RequestBody String profileImage) {
        return studentService.updateStudentProfileImage(id, profileImage);
    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @PutMapping("/uppassword")
    AuthenticationResponse updateStudentPassword(@RequestBody AuthenticationRequest password) {
        return authenticationService.changePassword(password);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/test")
    void test() {
        System.out.println("test");
    }

}
