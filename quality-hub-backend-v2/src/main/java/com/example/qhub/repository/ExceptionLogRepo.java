package com.example.qhub.repository;

import com.example.qhub.model.ExceptionLog;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ExceptionLogRepo extends JpaRepository<ExceptionLog, Long>{}
