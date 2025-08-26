package com.example.qhub.controller;

import com.example.qhub.model.ApplicationEntity;
import com.example.qhub.repository.ApplicationRepo;
import com.example.qhub.service.AppService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/entities/Application")
public class ApplicationController {
  private final AppService svc;
  private final ApplicationRepo repo;
  public ApplicationController(AppService svc, ApplicationRepo repo){ this.svc=svc; this.repo=repo; }

  @GetMapping public List<Map<String,Object>> list(@RequestParam(value="q", required=false) String q){ return svc.list(q); }
  @GetMapping("/{id}") public Map<String,Object> get(@PathVariable Long id){ return svc.get(id); }
  @PostMapping public ApplicationEntity create(@RequestBody ApplicationEntity a){ return repo.save(a); }
  @PutMapping("/{id}") public ApplicationEntity update(@PathVariable Long id, @RequestBody ApplicationEntity in){
    ApplicationEntity a = repo.findById(id).orElseThrow();
    a.setName(in.getName()); a.setVersionStr(in.getVersionStr()); a.setDescription(in.getDescription()); a.setActive(in.isActive());
    return repo.save(a);
  }
}
