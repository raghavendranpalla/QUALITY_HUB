package com.example.qhub.model;

import jakarta.persistence.*;

@Entity
public class Feature {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String name;
  @Column(length=1000) private String description;
  @ManyToOne(fetch = FetchType.LAZY) private ApplicationEntity application;
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public String getName(){return name;} public void setName(String n){this.name=n;}
  public String getDescription(){return description;} public void setDescription(String d){this.description=d;}
  public ApplicationEntity getApplication(){return application;} public void setApplication(ApplicationEntity a){this.application=a;}
}
