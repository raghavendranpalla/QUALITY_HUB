package com.example.qhub.repository;

import com.example.qhub.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AuthorRepo extends JpaRepository<Author, Long>{}
