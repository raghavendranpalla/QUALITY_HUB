package com.example.qhub.repository;

import com.example.qhub.model.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeatureRepo extends JpaRepository<Feature, Long> {
  List<Feature> findByApplicationId(Long appId);
}
