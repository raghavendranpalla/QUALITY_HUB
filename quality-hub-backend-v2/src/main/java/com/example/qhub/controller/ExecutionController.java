package com.example.qhub.controller;

import com.example.qhub.model.ApplicationEntity;
import com.example.qhub.model.Execution;
import com.example.qhub.model.TestCase;
import com.example.qhub.repository.ApplicationRepo;
import com.example.qhub.repository.ExecutionRepo;
import com.example.qhub.repository.TestCaseRepo;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/apps/{appId}/executions")
public class ExecutionController {
  private final ExecutionRepo repo; private final ApplicationRepo appRepo; private final TestCaseRepo tcRepo;
  public ExecutionController(ExecutionRepo repo, ApplicationRepo appRepo, TestCaseRepo tcRepo){
    this.repo=repo; this.appRepo=appRepo; this.tcRepo=tcRepo;
  }
  @GetMapping public List<Execution> list(@PathVariable Long appId){ return repo.findByApplicationId(appId); }
  @PostMapping public Execution create(@PathVariable Long appId, @RequestBody Execution e){
    ApplicationEntity a = appRepo.findById(appId).orElseThrow(); e.setApplication(a);
    if(e.getTestCase()!=null && e.getTestCase().getId()!=null){ e.setTestCase(tcRepo.findById(e.getTestCase().getId()).orElseThrow()); }
    if(e.getExecutedAt()==null) e.setExecutedAt(Instant.now());
    return repo.save(e);
  }
}
