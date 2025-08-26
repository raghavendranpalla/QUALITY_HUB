package com.example.qhub.model;

import jakarta.persistence.*;

@Entity
public class TestCase {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String title;
  @Column(length=2000) private String description;
  private String status; // READY,DRAFT,DISABLED
  private String priority; // LOW,MEDIUM,HIGH
  @ManyToOne(fetch=FetchType.LAZY) private ApplicationEntity application;
  @ManyToOne(fetch=FetchType.LAZY) private Feature feature;
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public String getTitle(){return title;} public void setTitle(String t){this.title=t;}
  public String getDescription(){return description;} public void setDescription(String d){this.description=d;}
  public String getStatus(){return status;} public void setStatus(String s){this.status=s;}
  public String getPriority(){return priority;} public void setPriority(String p){this.priority=p;}
  public ApplicationEntity getApplication(){return application;} public void setApplication(ApplicationEntity a){this.application=a;}
  public Feature getFeature(){return feature;} public void setFeature(Feature f){this.feature=f;}
}
