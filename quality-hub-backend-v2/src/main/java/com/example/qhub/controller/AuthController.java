package com.example.qhub.controller;

import com.example.qhub.model.AppUser;
import com.example.qhub.repository.AppUserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AppUserRepo users;
  public AuthController(AppUserRepo users){ this.users = users; }

  @PostMapping("/login")
  public ResponseEntity<AppUser> login(@RequestBody Map<String,String> body){
    String username = body.get("username");
    String password = body.get("password");
    return users.findByUsername(username)
            .filter(u -> u.getPassword() != null && u.getPassword().equals(password))
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
  }
}
