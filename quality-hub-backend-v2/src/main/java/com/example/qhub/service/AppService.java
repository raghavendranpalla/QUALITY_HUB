package com.example.qhub.service;

import com.example.qhub.model.ApplicationEntity;
import com.example.qhub.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppService {
  private final ApplicationRepo apps;
  private final TestCaseRepo tests;
  private final ExecutionRepo execs;
  public AppService(ApplicationRepo apps, TestCaseRepo tests, ExecutionRepo execs){
    this.apps=apps; this.tests=tests; this.execs=execs;
  }
  public List<java.util.Map<String,Object>> list(String q){
    List<ApplicationEntity> list = (q==null||q.isBlank())? apps.findAll() : apps.findByNameContainingIgnoreCase(q);
    return list.stream().map(this::summary).collect(Collectors.toList());
  }
  public java.util.Map<String,Object> get(Long id){
    return summary(apps.findById(id).orElseThrow());
  }
  private java.util.Map<String,Object> summary(ApplicationEntity a){
    long tc = tests.findByApplicationId(a.getId()).size();
    long count = execs.countAllByAppId(a.getId());
    long passed = execs.countPassedByAppId(a.getId());
    int passRate = count==0?0:(int)Math.round(100.0*passed/count);
    java.util.Map<String,Object> m = new java.util.LinkedHashMap<>();
    m.put("id", a.getId()); m.put("name", a.getName()); m.put("version", a.getVersionStr());
    m.put("description", a.getDescription()); m.put("active", a.isActive()); m.put("updatedAt", a.getUpdatedAt());
    m.put("testCases", tc); m.put("executions", count); m.put("passRate", passRate);
    return m;
  }
}
