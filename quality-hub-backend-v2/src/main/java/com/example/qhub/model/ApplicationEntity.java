package com.example.qhub.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class ApplicationEntity {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String name;
  private String versionStr;
  @Column(length=1000) private String description;
  private boolean active = true;
  private Instant updatedAt;
  @PrePersist @PreUpdate public void touch(){ updatedAt = Instant.now(); }
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public String getName(){return name;} public void setName(String n){this.name=n;}
  public String getVersionStr(){return versionStr;} public void setVersionStr(String v){this.versionStr=v;}
  public String getDescription(){return description;} public void setDescription(String d){this.description=d;}
  public boolean isActive(){return active;} public void setActive(boolean a){this.active=a;}
  public Instant getUpdatedAt(){return updatedAt;} public void setUpdatedAt(Instant i){this.updatedAt=i;}
}
