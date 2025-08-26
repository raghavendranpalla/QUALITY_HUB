package com.example.qhub.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class ActivityLog {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
  private Instant ts; private String method; private String path; private int status; private long durationMs;
  public Long getId(){return id;} public void setId(Long id){this.id=id;}
  public Instant getTs(){return ts;} public void setTs(Instant t){this.ts=t;}
  public String getMethod(){return method;} public void setMethod(String m){this.method=m;}
  public String getPath(){return path;} public void setPath(String p){this.path=p;}
  public int getStatus(){return status;} public void setStatus(int s){this.status=s;}
  public long getDurationMs(){return durationMs;} public void setDurationMs(long d){this.durationMs=d;}
}
