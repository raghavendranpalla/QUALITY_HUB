package com.example.qhub.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class ExceptionLog {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private Instant ts; private String severity;
  @Column(length=2000) private String message;
  @Column(length=4000) private String stacktrace;
  @ManyToOne(fetch=FetchType.LAZY) private ApplicationEntity application;
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public Instant getTs(){return ts;} public void setTs(Instant t){this.ts=t;}
  public String getSeverity(){return severity;} public void setSeverity(String s){this.severity=s;}
  public String getMessage(){return message;} public void setMessage(String m){this.message=m;}
  public String getStacktrace(){return stacktrace;} public void setStacktrace(String s){this.stacktrace=s;}
  public ApplicationEntity getApplication(){return application;} public void setApplication(ApplicationEntity a){this.application=a;}
}
