package org.biog.unihivebackend.service.implementation;

import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.model.User;
import org.biog.unihivebackend.repository.AdminRepository;
import org.biog.unihivebackend.repository.ClubRepository;
import org.biog.unihivebackend.repository.UserRepository;
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
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Club updateClub(UUID id, Club newclub, UUID schoolId) {
        Club oldclub = clubRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Club with id " + id + " not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        if (!isAdmin) {
            User olduser = oldclub.getUser();
            olduser.setEmail(newclub.getUser().getEmail());
            olduser.setPassword(passwordEncoder.encode(newclub.getUser().getPassword()));
            userRepository.save(olduser);
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

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to modify clubs in this school");
        }

        User olduser = oldclub.getUser();
        olduser.setEmail(newclub.getUser().getEmail());
        olduser.setPassword(passwordEncoder.encode(newclub.getUser().getPassword()));
        userRepository.save(olduser);
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
    public void deleteClub(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to delete clubs in this school");
        }
        userRepository.deleteById(clubRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Club with id " + id + " not found")).getUser().getId());
        clubRepository.deleteById(id);
    }

    @Override
    public Club getClub(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get clubs in this school");
        }
        return clubRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Club with id " + id + " not found"));
    }

    @Override
    public List<Club> getAll(UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_ADMIN"));
        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!isAdmin) {
            return clubRepository.findAll();
        }
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get all clubs in this school");
        }
        return clubRepository.findBySchool(schoolId);
    }

    @Override
    public School getSchoolByClub(UUID id) {
        return clubRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Club with id " + id + " not found")).getSchool();
    }

    @Override
    public List<Event> getEventsByClub(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get events by clubs in this school");
        }
        return clubRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Club with id " + id + " not found")).getEvents();
    }

    @Override
    public List<Student> getFollowers(UUID id, UUID schoolId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        UUID loggedInUserSchoolId = adminRepository.findByUser(((User) (authentication)
                .getPrincipal())).orElseThrow(() -> new NotFoundException("Admin not found")).getSchool()
                .getId();
        if (!schoolId.equals(loggedInUserSchoolId)) {
            throw new NotFoundException("You do not have permission to get followers of clubs in this school");
        }
        return clubRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Club with id " + id + " not found")).getStudents();
    }

}