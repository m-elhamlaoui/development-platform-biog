package org.biog.controller;


import lombok.AllArgsConstructor;
import org.biog.model.Club;
import org.biog.service.ClubService;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/club")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ClubController {
    private final ClubService clubService;

    @GetMapping("/clubs")
    List<Club> getAllClubs() throws AccessDeniedException {
        return clubService.getAll();
    }
}
