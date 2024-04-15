package org.biog.unihivebackend.controller;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.biog.unihivebackend.model.Admin;
import org.biog.unihivebackend.service.AdminService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

  private final AdminService adminService;

  @GetMapping("/admins")
  public List<Admin> getAll() {
    return adminService.getAll();
  }

  @GetMapping("/getadmin/{id}")
  public Admin getAdmin(@PathVariable UUID id) {
    return adminService.getAdmin(id);
  }

  @DeleteMapping("/deladmin/{id}")
  public void deleteAdmin(@PathVariable UUID id) {
    adminService.deleteAdmin(id);
  }

  @PutMapping("/upadmin/{id}")
  public Admin updateAdmin(@PathVariable UUID id, @RequestBody Admin newadmin) {
    return adminService.updateAdmin(id, newadmin);
  }
}
