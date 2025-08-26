package com.example.qhub.repository;

import com.example.qhub.model.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepo extends JpaRepository<ApplicationEntity, Long> {
  List<ApplicationEntity> findByNameContainingIgnoreCase(String q);
}
