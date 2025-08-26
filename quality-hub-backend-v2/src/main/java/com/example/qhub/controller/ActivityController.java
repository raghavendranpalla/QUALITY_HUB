package com.example.qhub.controller;

import com.example.qhub.model.ActivityLog;
import com.example.qhub.repository.ActivityLogRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController @RequestMapping("/api/activity")
public class ActivityController {
  private final ActivityLogRepo repo; public ActivityController(ActivityLogRepo repo){ this.repo=repo; }
  @GetMapping public List<ActivityLog> list(){ return repo.findTop300ByOrderByIdDesc(); }
}
