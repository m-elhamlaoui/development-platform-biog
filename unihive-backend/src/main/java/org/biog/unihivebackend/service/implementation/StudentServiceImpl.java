package org.biog.unihivebackend.service.implementation;

import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.model.User;
import org.biog.unihivebackend.repository.StudentRepository;
import org.biog.unihivebackend.repository.UserRepository;
import org.biog.unihivebackend.service.StudentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public Student updateStudent(UUID id, Student newstudent) {
        Student oldstudent = studentRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Student with id " + id + " not found"));
        
        User olduser = oldstudent.getUser_id();
        olduser.setEmail(newstudent.getUser_id().getEmail());
        olduser.setPassword(passwordEncoder.encode(newstudent.getUser_id().getPassword()));
        userRepository.save(olduser);
        oldstudent.setFirstName(newstudent.getFirstName());
        oldstudent.setLastName(newstudent.getLastName());
        oldstudent.setSchool_id(newstudent.getSchool_id());
        oldstudent.setCne(newstudent.getCne());
        oldstudent.setNumApogee(newstudent.getNumApogee());
        oldstudent.setProfileImage(newstudent.getProfileImage());
        oldstudent.setClubs(newstudent.getClubs());
        return studentRepository.save(oldstudent);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public void deleteStudent(UUID id) {
        userRepository.deleteById(studentRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Student with id " + id + " not found")
        ).getUser_id().getId());
        studentRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public Student getStudent(UUID id) {
        return studentRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Student with id " + id + " not found")
        );
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public School getSchoolByStudent(UUID id) {
        return studentRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Student with id " + id + " not found")
        ).getSchool_id();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public List<Club> getClubsByFollower(UUID id) {
        return studentRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Student with id " + id + " not found")
        ).getClubs();
    }
    
}