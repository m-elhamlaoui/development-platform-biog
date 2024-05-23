package org.biog.unihivebackend.service.implementation;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.repository.SchoolRepository;
import org.biog.unihivebackend.repository.StudentRepository;
import org.biog.unihivebackend.service.StudentService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {

        private final StudentRepository studentRepository;
        private SchoolRepository schoolRepository;

        @Override
        public Student updateStudent(UUID id, Student newstudent, UUID... schoolId) throws AccessDeniedException {
                Student oldstudent = studentRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Student with id " + id + " not found"));

                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        oldstudent.setEmail(newstudent.getEmail());
                        oldstudent.setFirstName(newstudent.getFirstName());
                        oldstudent.setLastName(newstudent.getLastName());
                        oldstudent.setSchool(newstudent.getSchool());
                        oldstudent.setCne(newstudent.getCne());
                        oldstudent.setNumApogee(newstudent.getNumApogee());
                        oldstudent.setProfileImage(newstudent.getProfileImage());
                        return studentRepository.save(oldstudent);
                }

                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new AccessDeniedException("You do not have permission to modify students in this school");
                }

                oldstudent.setEmail(newstudent.getEmail());
                oldstudent.setFirstName(newstudent.getFirstName());
                oldstudent.setLastName(newstudent.getLastName());
                oldstudent.setCne(newstudent.getCne());
                oldstudent.setNumApogee(newstudent.getNumApogee());
                oldstudent.setProfileImage(newstudent.getProfileImage());
                return studentRepository.save(oldstudent);
        }

        @Override
        public void deleteStudent(UUID id, UUID... schoolId) throws AccessDeniedException {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        studentRepository.deleteById(id);
                } else {
                        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                        if (!schoolId[0].equals(loggedInUserSchoolId)) {
                                throw new AccessDeniedException(
                                                "You do not have permission to delete students in this school");
                        }
                        studentRepository.deleteById(id);
                }
        }

        @Override
        public Student getStudent(UUID id, UUID... schoolId) throws AccessDeniedException {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        return studentRepository.findById(id).orElseThrow(
                                        () -> new NotFoundException("Student with id " + id + " not found"));
                }
                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new AccessDeniedException("You do not have permission to get students in this school");
                }
                return studentRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Student with id " + id + " not found"));
        }

        @Override
        public List<Student> getAll(UUID... schoolId) throws AccessDeniedException {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        return studentRepository.findAll();
                }
                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new AccessDeniedException("You do not have permission to get all clubs in this school");
                }
                School school = schoolRepository.findById(schoolId[0]).orElseThrow(
                                () -> new NotFoundException("School with id " + schoolId[0] + " not found"));
                return studentRepository.findBySchool(school);
        }

        @Override
        public School getSchoolByStudent(UUID id) {
                return studentRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Student with id " + id + " not found")).getSchool();
        }

        @Override
        public List<Club> getClubsByFollower(UUID id, UUID... schoolId) throws AccessDeniedException {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        return studentRepository.findById(id).orElseThrow(
                                        () -> new NotFoundException("Student with id " + id + " not found")).getClubs();
                }
                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new AccessDeniedException("You do not have permission to get all clubs in this school");
                }
                return studentRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Student with id " + id + " not found"))
                                .getClubsBySchool(schoolId[0]);
        }

}