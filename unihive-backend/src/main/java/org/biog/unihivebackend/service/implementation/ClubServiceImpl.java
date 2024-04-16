package org.biog.unihivebackend.service.implementation;

import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.Event;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.model.User;
import org.biog.unihivebackend.repository.ClubRepository;
import org.biog.unihivebackend.repository.UserRepository;
import org.biog.unihivebackend.service.ClubService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClubServiceImpl implements ClubService {
    
    private final ClubRepository clubRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public Club updateClub(UUID id, Club newclub) {
        Club oldclub = clubRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Club with id " + id + " not found"));
        User olduser = oldclub.getUser_id();
        olduser.setEmail(newclub.getUser_id().getEmail());
        olduser.setPassword(passwordEncoder.encode(newclub.getUser_id().getPassword()));
        userRepository.save(olduser);
        oldclub.setClubName(newclub.getClubName());
        oldclub.setClubLogo(newclub.getClubLogo());
        oldclub.setClubDescription(newclub.getClubDescription());
        oldclub.setClubBanner(newclub.getClubBanner());
        oldclub.setClubRating(newclub.getClubRating());
        oldclub.setRatingCount(newclub.getRatingCount());
        oldclub.setSchool_id(newclub.getSchool_id());
        oldclub.setEvents(newclub.getEvents());
        oldclub.setStudents(newclub.getStudents());
        return clubRepository.save(oldclub);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public void deleteClub(UUID id) {
        userRepository.deleteById(clubRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Club with id " + id + " not found")
        ).getUser_id().getId());
        clubRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public Club getClub(UUID id) {
        return clubRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Club with id " + id + " not found")
        );
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public List<Club> getAll() {
        return clubRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public School getSchoolByClub(UUID id) {
        return clubRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Club with id " + id + " not found")
        ).getSchool_id();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public List<Event> getEventsByClub(UUID id) {
        return clubRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Club with id " + id + " not found")
        ).getEvents();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    @Override
    public List<Student> getFollowers(UUID id) {
        return clubRepository.findById(id).orElseThrow(
            () -> new NotFoundException("Club with id " + id + " not found")
        ).getStudents();
    }
    
}