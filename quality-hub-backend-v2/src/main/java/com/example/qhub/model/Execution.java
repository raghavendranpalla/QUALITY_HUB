package com.example.qhub.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Execution {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private String status; // PASSED,FAILED,SKIPPED
  private Long durationMs;
  private Instant executedAt;
  @ManyToOne(fetch=FetchType.LAZY) private ApplicationEntity application;
  @ManyToOne(fetch=FetchType.LAZY) private TestCase testCase;
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public String getStatus(){return status;} public void setStatus(String s){this.status=s;}
  public Long getDurationMs(){return durationMs;} public void setDurationMs(Long d){this.durationMs=d;}
  public Instant getExecutedAt(){return executedAt;} public void setExecutedAt(Instant e){this.executedAt=e;}
  public ApplicationEntity getApplication(){return application;} public void setApplication(ApplicationEntity a){this.application=a;}
  public TestCase getTestCase(){return testCase;} public void setTestCase(TestCase t){this.testCase=t;}
}
