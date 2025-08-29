package com.example.qhub.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity @Table(name="app_user")
public class AppUser {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  @Column(unique=true) private String username;
  private String displayName; private String role;
  @JsonIgnore private String password;
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public String getUsername(){return username;} public void setUsername(String u){this.username=u;}
  public String getDisplayName(){return displayName;} public void setDisplayName(String d){this.displayName=d;}
  public String getRole(){return role;} public void setRole(String r){this.role=r;}
  public String getPassword(){return password;} public void setPassword(String p){this.password=p;}
}
