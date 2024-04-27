package org.biog.unihivebackend.service.implementation;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.repository.ClubRepository;
import org.biog.unihivebackend.repository.SchoolRepository;
import org.biog.unihivebackend.service.ClubService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClubServiceImpl implements ClubService {

        private final ClubRepository clubRepository;
        private final SchoolRepository schoolRepository;
        private final PasswordEncoder passwordEncoder;

        @Override
        public Club updateClub(UUID id, Club newclub, UUID... schoolId) throws AccessDeniedException {
                Club oldclub = clubRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Club with id " + id + " not found"));

                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        oldclub.setEmail(newclub.getEmail());
                        oldclub.setPassword(passwordEncoder.encode(newclub.getPassword()));
                        oldclub.setClubName(newclub.getClubName());
                        oldclub.setClubLogo(newclub.getClubLogo());
                        oldclub.setClubDescription(newclub.getClubDescription());
                        oldclub.setClubBanner(newclub.getClubBanner());
                        oldclub.setClubRating(newclub.getClubRating());
                        oldclub.setRatingCount(newclub.getRatingCount());
                        oldclub.setSchool(newclub.getSchool());
                        oldclub.setEvents(newclub.getEvents());
                        oldclub.setStudents(newclub.getStudents());
                        return clubRepository.save(oldclub);
                }

                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new AccessDeniedException("You do not have permission to modify clubs in this school");
                }

                oldclub.setEmail(newclub.getEmail());
                oldclub.setPassword(passwordEncoder.encode(newclub.getPassword()));
                oldclub.setClubName(newclub.getClubName());
                oldclub.setClubLogo(newclub.getClubLogo());
                oldclub.setClubDescription(newclub.getClubDescription());
                oldclub.setClubBanner(newclub.getClubBanner());
                oldclub.setClubRating(newclub.getClubRating());
                oldclub.setRatingCount(newclub.getRatingCount());
                oldclub.setEvents(newclub.getEvents());
                oldclub.setStudents(newclub.getStudents());
                return clubRepository.save(oldclub);
        }

        @Override
        public void deleteClub(UUID id, UUID... schoolId) throws AccessDeniedException {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        clubRepository.deleteById(id);
                } else {
                        UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                        if (!schoolId[0].equals(loggedInUserSchoolId)) {
                                throw new AccessDeniedException(
                                                "You do not have permission to delete clubs in this school");
                        }
                        clubRepository.deleteById(id);
                }
        }

        @Override
        public Club getClub(UUID id, UUID... schoolId) throws AccessDeniedException {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        return clubRepository.findById(id).orElseThrow(
                                        () -> new NotFoundException("Club with id " + id + " not found"));
                }
                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new AccessDeniedException("You do not have permission to get clubs in this school");
                }
                return clubRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Club with id " + id + " not found"));
        }

        @Override
        public List<Club> getAll(UUID... schoolId) throws AccessDeniedException {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        return clubRepository.findAll();
                }
                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new AccessDeniedException("You do not have permission to get all clubs in this school");
                }
                School school = schoolRepository.findById(schoolId[0]).orElseThrow(
                                () -> new NotFoundException("School with id " + schoolId[0] + " not found"));
                return clubRepository.findBySchool(school);
        }

        @Override
        public School getSchoolByClub(UUID id) {
                return clubRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Club with id " + id + " not found")).getSchool();
        }

        @Override
        public List<Event> getEventsByClub(UUID id, UUID... schoolId) throws AccessDeniedException {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        return clubRepository.findById(id).orElseThrow(
                                        () -> new NotFoundException("Club with id " + id + " not found")).getEvents();
                }
                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new AccessDeniedException(
                                        "You do not have permission to get events by clubs in this school");
                }
                return clubRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Club with id " + id + " not found")).getEvents();
        }

        @Override
        public List<Student> getFollowers(UUID id, UUID... schoolId) {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                boolean isAdmin = authentication.getAuthorities().stream()
                                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
                if (!isAdmin) {
                        return clubRepository.findById(id).orElseThrow(
                                        () -> new NotFoundException("Club with id " + id + " not found")).getStudents();
                }
                UUID loggedInUserSchoolId = ((Admin) (authentication).getPrincipal()).getSchool().getId();
                if (!schoolId[0].equals(loggedInUserSchoolId)) {
                        throw new NotFoundException(
                                        "You do not have permission to get followers of clubs in this school");
                }
                return clubRepository.findById(id).orElseThrow(
                                () -> new NotFoundException("Club with id " + id + " not found")).getStudents();
        }

}