package com.example.qhub.controller;

import com.example.qhub.model.ExceptionLog;
import com.example.qhub.repository.ExceptionLogRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/entities/Exception")
public class ExceptionController {
  private final ExceptionLogRepo repo; public ExceptionController(ExceptionLogRepo repo){ this.repo=repo; }
  @GetMapping public List<ExceptionLog> list(){ return repo.findAll(); }
}
