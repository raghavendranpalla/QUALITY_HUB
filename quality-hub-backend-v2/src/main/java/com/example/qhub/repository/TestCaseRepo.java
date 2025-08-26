package com.example.qhub.repository;

import com.example.qhub.model.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestCaseRepo extends JpaRepository<TestCase, Long>{
  List<TestCase> findByApplicationId(Long appId);
  List<TestCase> findByApplicationIdAndFeatureId(Long appId, Long featureId);
}
