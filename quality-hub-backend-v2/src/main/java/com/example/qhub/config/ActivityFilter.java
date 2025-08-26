package com.example.qhub.config;

import com.example.qhub.model.ActivityLog;
import com.example.qhub.repository.ActivityLogRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;

@Component
public class ActivityFilter extends OncePerRequestFilter {
  private final ActivityLogRepo repo;
  public ActivityFilter(ActivityLogRepo repo){ this.repo=repo; }

  @Override
  protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
      throws ServletException, IOException {
    long start = System.currentTimeMillis();
    try { chain.doFilter(req, res); }
    finally {
      ActivityLog log = new ActivityLog();
      log.setTs(Instant.now());
      log.setMethod(req.getMethod());
      log.setPath(req.getRequestURI());
      log.setStatus(res.getStatus());
      log.setDurationMs(System.currentTimeMillis()-start);
      repo.save(log);
    }
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String p = request.getRequestURI();
    return p.startsWith("/h2-console") || p.startsWith("/actuator");
  }
}
