package org.biog.unihivebackend.service.implementation;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.model.User;
import org.biog.unihivebackend.repository.AdminRepository;
import org.biog.unihivebackend.repository.StudentRepository;
import org.biog.unihivebackend.repository.UserRepository;
import org.biog.unihivebackend.service.StudentService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Student updateStudent(UUID id, Student newstudent, UUID schoolId) throws AccessDeniedException {
        Student oldstudent = studentRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Student with id " + id + " not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            User olduser = oldstudent.getUser();
            olduser.setEmail(newstudent.getUser().getEmail());
            olduser.setPassword(passwordEncoder.encode(newstudent.getUser().getPassword()));
            userRepository.save(olduser);
            oldstudent.setFirstName(newstudent.getFirstName());
            oldstudent.setLastName(newstudent.getLastName());
            oldstudent.setSchool(newstudent.getSchool());
            oldstudent.setCne(newstudent.getCne());
            oldstudent.setNumApogee(newstudent.getNumApogee());
            oldstudent.setProfileImage(newstudent.getProfileImage());
            oldstudent.setClubs(newstudent.getClubs());
            return studentRepository.save(oldstudent);
        }

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new AccessDeniedException("You do not have permission to modify students in this school");
        }

        User olduser = oldstudent.getUser();
        olduser.setEmail(newstudent.getUser().getEmail());
        olduser.setPassword(passwordEncoder.encode(newstudent.getUser().getPassword()));
        userRepository.save(olduser);
        oldstudent.setFirstName(newstudent.getFirstName());
        oldstudent.setLastName(newstudent.getLastName());
        oldstudent.setCne(newstudent.getCne());
        oldstudent.setNumApogee(newstudent.getNumApogee());
        oldstudent.setProfileImage(newstudent.getProfileImage());
        oldstudent.setClubs(newstudent.getClubs());
        return studentRepository.save(oldstudent);
    }

    @Override
    public void deleteStudent(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to delete students in this school");
        }
        userRepository.deleteById(studentRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Student with id " + id + " not found")).getUser().getId());
        studentRepository.deleteById(id);
    }

    @Override
    public Student getStudent(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get students in this school");
        }
        return studentRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Student with id " + id + " not found"));
    }

    @Override
    public List<Student> getAll(UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!isAdmin) {
            return studentRepository.findAll();
        }
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get all clubs in this school");
        }
        return studentRepository.findBySchool(schoolId);
    }

    @Override
    public School getSchoolByStudent(UUID id, UUID schoolId) {
        return studentRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Student with id " + id + " not found")).getSchool();
    }

    @Override
    public List<Club> getClubsByFollower(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!isAdmin) {
            return studentRepository.findById(id).orElseThrow(
                    () -> new NotFoundException("Student with id " + id + " not found")).getClubs();
        }
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get all clubs in this school");
        }
        return studentRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Student with id " + id + " not found")).getClubsBySchool(schoolId);
    }

}