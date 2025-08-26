package com.example.qhub.controller;

import com.example.qhub.model.AppUser;
import com.example.qhub.repository.AppUserRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/entities/User")
public class UserController {
  private final AppUserRepo repo; public UserController(AppUserRepo repo){ this.repo=repo; }
  @GetMapping public List<AppUser> list(){ return repo.findAll(); }
}
