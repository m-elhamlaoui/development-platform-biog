package org.biog.unihivebackend.controller;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.service.AdminService;
import org.biog.unihivebackend.service.ClubService;
import org.biog.unihivebackend.service.EventService;
import org.biog.unihivebackend.service.SchoolService;
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
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/superadmin")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SuperAdminController {
    private final AdminService adminService;
    private final StudentService studentService;
    private final ClubService clubService;
    private final EventService eventService;
    private final SchoolService schoolService;

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/admins")
    List<Admin> getAllAdmins() {
        return adminService.getAll();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PutMapping("/upadmin/{id}")
    Admin updateAdmin(@PathVariable UUID id, @RequestBody Admin newadmin) {
        return adminService.updateAdmin(id, newadmin);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/deladmin/{id}")
    void deleteAdmin(@PathVariable UUID id) {
        adminService.deleteAdmin(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/admin/{id}")
    Admin getAdmin(@PathVariable UUID id) {
        return adminService.getAdmin(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/schools")
    List<School> getAllSchools() {
        return schoolService.getAll();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/school/{id}")
    School getSchool(@PathVariable UUID id) {
        return schoolService.getSchool(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PostMapping("/addschool")
    School addSchool(@RequestBody School school) {
        return schoolService.addSchool(school);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/delschool/{id}")
    void deleteSchool(@PathVariable UUID id) {
        schoolService.deleteSchool(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PutMapping("/upschool/{id}")
    School updateSchool(@PathVariable UUID id, @RequestBody School newschool) {
        return schoolService.updateSchool(id, newschool);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/students")
    List<Student> getAllStudents() throws AccessDeniedException {
        return studentService.getAll();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PutMapping("/upstudent/{id}")
    Student updateStudent(@PathVariable UUID id, @RequestBody Student newstudent) throws AccessDeniedException {
        return studentService.updateStudent(id, newstudent);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/delstudent/{id}")
    void deleteStudent(@PathVariable UUID id) throws AccessDeniedException {
        studentService.deleteStudent(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/student/{id}")
    Student getStudent(@PathVariable UUID id) throws AccessDeniedException {
        return studentService.getStudent(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/clubs")
    List<Club> getAllClubs() throws AccessDeniedException {
        return clubService.getAll();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PutMapping("/upclub/{id}")
    Club updateClub(@PathVariable UUID id, Club newclub) throws AccessDeniedException {
        return clubService.updateClub(id, newclub);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/delclub/{id}")
    void deleteClub(@PathVariable UUID id) throws AccessDeniedException {
        clubService.deleteClub(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/club/{id}")
    Club getClub(@PathVariable UUID id) throws AccessDeniedException {
        return clubService.getClub(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/events")
    List<Event> getAllEvents() throws AccessDeniedException {
        return eventService.getAll();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @PutMapping("/upevent/{id}")
    Event updateEvent(@PathVariable UUID id, @RequestBody Event newevent) throws AccessDeniedException {
        return eventService.updateEvent(id, newevent);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @DeleteMapping("/delevent/{id}")
    void deleteEvent(@PathVariable UUID id) throws AccessDeniedException {
        eventService.deleteEvent(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @GetMapping("/event/{id}")
    Event getEvent(@PathVariable UUID id) throws AccessDeniedException {
        return eventService.getEvent(id);
    }
}
