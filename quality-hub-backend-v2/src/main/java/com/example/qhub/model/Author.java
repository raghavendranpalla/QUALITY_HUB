package com.example.qhub.model;

import jakarta.persistence.*;

@Entity
public class Author {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String name; private String email;
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public String getName(){return name;} public void setName(String n){this.name=n;}
  public String getEmail(){return email;} public void setEmail(String e){this.email=e;}
}
