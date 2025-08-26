package com.example.qhub.repository;

import com.example.qhub.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AppUserRepo extends JpaRepository<AppUser, Long>{}
