package com.example.qhub.controller;

import com.example.qhub.model.ApplicationEntity;
import com.example.qhub.model.Feature;
import com.example.qhub.repository.ApplicationRepo;
import com.example.qhub.repository.FeatureRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class FeatureController {
  private final FeatureRepo repo; private final ApplicationRepo appRepo;
  public FeatureController(FeatureRepo repo, ApplicationRepo appRepo){ this.repo=repo; this.appRepo=appRepo; }

  // Collection by app
  @GetMapping("/api/apps/{appId}/features") public List<Feature> list(@PathVariable Long appId){ return repo.findByApplicationId(appId); }
  @PostMapping("/api/apps/{appId}/features") public Feature create(@PathVariable Long appId, @RequestBody Feature f){
    ApplicationEntity a = appRepo.findById(appId).orElseThrow(); f.setApplication(a); return repo.save(f); }
  @PutMapping("/api/apps/{appId}/features/{id}") public Feature update(@PathVariable Long appId, @PathVariable Long id, @RequestBody Feature in){
    Feature f = repo.findById(id).orElseThrow(); f.setName(in.getName()); f.setDescription(in.getDescription()); return repo.save(f); }
  @DeleteMapping("/api/apps/{appId}/features/{id}") public void del(@PathVariable Long appId, @PathVariable Long id){ repo.deleteById(id); }

  // Flat entity list for activity/demo
  @GetMapping("/api/entities/Feature") public List<Feature> all(){ return repo.findAll(); }
}
