package com.example.qhub.repository;

import com.example.qhub.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface AppUserRepo extends JpaRepository<AppUser, Long>{
  Optional<AppUser> findByUsername(String username);
}
