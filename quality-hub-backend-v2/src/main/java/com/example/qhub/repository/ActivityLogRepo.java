package com.example.qhub.repository;

import com.example.qhub.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ActivityLogRepo extends JpaRepository<ActivityLog, Long>{
  List<ActivityLog> findTop300ByOrderByIdDesc();
}
