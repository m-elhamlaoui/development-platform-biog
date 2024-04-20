package org.biog.unihivebackend.service.implementation;

import java.util.List;
import java.util.UUID;

import org.biog.unihivebackend.exception.NotFoundException;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.model.School;
import org.biog.unihivebackend.model.Student;
import org.biog.unihivebackend.repository.SchoolRepository;
import org.biog.unihivebackend.service.SchoolService;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;

    @Override
    public List<School> getAll() {
        return schoolRepository.findAll();
    }

    @Override
    public School addSchool(School school) {
        return schoolRepository.save(school);
    }

    @Override
    public School updateSchool(UUID id, School newschool) {
        School oldschool = schoolRepository.findById(id).orElseThrow(
                () -> new NotFoundException("School with id " + id + " not found"));

        oldschool.setSchoolName(newschool.getSchoolName());
        oldschool.setSchoolAddress(newschool.getSchoolAddress());
        oldschool.setSchoolCity(newschool.getSchoolCity());
        oldschool.setClubs(newschool.getClubs());
        oldschool.setStudents(newschool.getStudents());
        return schoolRepository.save(oldschool);
    }

    @Override
    public void deleteSchool(UUID id) {
        schoolRepository.deleteById(id);
    }

    @Override
    public School getSchool(UUID id) {
        return schoolRepository.findById(id).orElseThrow(
                () -> new NotFoundException("School with id " + id + " not found"));
    }

    @Override
    public List<Club> getClubsBySchool(UUID id) {
        return schoolRepository.findById(id).orElseThrow(
                () -> new NotFoundException("School with id " + id + " not found")).getClubs();
    }

    @Override
    public List<Student> getStudentsBySchool(UUID id) {
        return schoolRepository.findById(id).orElseThrow(
                () -> new NotFoundException("School with id " + id + " not found")).getStudents();
    }

    @Override
    public Admin getAdminBySchool(UUID id) {
        return schoolRepository.findById(id).orElseThrow(
                () -> new NotFoundException("School with id " + id + " not found")).getAdmin();
    }
}