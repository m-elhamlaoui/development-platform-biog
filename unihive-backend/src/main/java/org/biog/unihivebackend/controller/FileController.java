package org.biog.unihivebackend.controller;

import java.io.IOException;
import java.util.List;

import lombok.AllArgsConstructor;

import org.biog.unihivebackend.service.FileService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "${spring.graphql.cors.allowed-origins}")
public class FileController {

    private final FileService fileService;

    @GetMapping("/list")
    public ResponseEntity<List<String>> listOfFiles() {

        List<String> files = fileService.listOfFiles();

        return ResponseEntity.ok(files);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam MultipartFile[] files) throws IOException {

        fileService.uploadFiles(files);

        return ResponseEntity.ok("Files uploaded successfully");
    }

    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(
            @PathVariable String fileName) {

        fileService.deleteFile(fileName);

        return ResponseEntity.ok(" File deleted successfully");
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String fileName) {

        ByteArrayResource resource = fileService.downloadFile(fileName);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + fileName + "\"");

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).headers(headers).body(resource);
    }

    @GetMapping("/file/{fileName}")
    public ResponseEntity<String> getFile(@PathVariable String fileName) {
        String url = fileService.getFileURL(fileName);
        return ResponseEntity.ok(url);
    }
}