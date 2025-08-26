package com.example.qhub.controller;

import com.example.qhub.model.ApplicationEntity;
import com.example.qhub.model.Feature;
import com.example.qhub.model.TestCase;
import com.example.qhub.repository.ApplicationRepo;
import com.example.qhub.repository.FeatureRepo;
import com.example.qhub.repository.TestCaseRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/apps/{appId}/testcases")
public class TestCaseController {
  private final TestCaseRepo repo; private final ApplicationRepo appRepo; private final FeatureRepo featureRepo;
  public TestCaseController(TestCaseRepo repo, ApplicationRepo appRepo, FeatureRepo featureRepo){
    this.repo=repo; this.appRepo=appRepo; this.featureRepo=featureRepo;
  }
  @GetMapping public List<TestCase> list(@PathVariable Long appId, @RequestParam(value="featureId",required=false) Long featureId){
    if(featureId!=null) return repo.findByApplicationIdAndFeatureId(appId, featureId);
    return repo.findByApplicationId(appId);
  }
  @PostMapping public TestCase create(@PathVariable Long appId, @RequestBody TestCase t){
    ApplicationEntity a = appRepo.findById(appId).orElseThrow(); t.setApplication(a);
    if(t.getFeature()!=null && t.getFeature().getId()!=null){ Feature f = featureRepo.findById(t.getFeature().getId()).orElseThrow(); t.setFeature(f); }
    return repo.save(t);
  }
  @PutMapping("/{id}") public TestCase update(@PathVariable Long appId, @PathVariable Long id, @RequestBody TestCase in){
    TestCase t = repo.findById(id).orElseThrow();
    t.setTitle(in.getTitle()); t.setDescription(in.getDescription()); t.setStatus(in.getStatus()); t.setPriority(in.getPriority());
    if(in.getFeature()!=null && in.getFeature().getId()!=null){ Feature f = featureRepo.findById(in.getFeature().getId()).orElseThrow(); t.setFeature(f); }
    return repo.save(t);
  }
  @DeleteMapping("/{id}") public void del(@PathVariable Long appId, @PathVariable Long id){ repo.deleteById(id); }
}
