package com.example.qhub.controller;

import com.example.qhub.model.Author;
import com.example.qhub.repository.AuthorRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/entities/Author")
public class AuthorController {
  private final AuthorRepo repo; public AuthorController(AuthorRepo repo){this.repo=repo;}
  @GetMapping public List<Author> list(){ return repo.findAll(); }
}
