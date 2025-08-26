package com.example.qhub.repository;

import com.example.qhub.model.Execution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExecutionRepo extends JpaRepository<Execution, Long> {
  java.util.List<Execution> findByApplicationId(Long appId);
  @Query("select count(e) from Execution e where e.application.id=?1 and e.status='PASSED'")
  long countPassedByAppId(Long appId);
  @Query("select count(e) from Execution e where e.application.id=?1")
  long countAllByAppId(Long appId);
}
