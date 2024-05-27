package org.biog.unihivebackend.controller;

import lombok.AllArgsConstructor;
import org.biog.unihivebackend.model.Club;
import org.biog.unihivebackend.service.ClubService;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/club")
@AllArgsConstructor
@CrossOrigin(origins = "${spring.graphql.cors.allowed-origins}")
public class ClubController {
    private final ClubService clubService;

    @GetMapping("/clubs")
    List<Club> getAllClubs() throws AccessDeniedException {
        return clubService.getAll();
    }
}
