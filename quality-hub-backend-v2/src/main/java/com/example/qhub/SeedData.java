package com.example.qhub;

import com.example.qhub.model.*;
import com.example.qhub.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Instant;
import java.util.List;
import java.util.Random;

@Configuration
public class SeedData {
  @Bean CommandLineRunner init(ApplicationRepo apps, FeatureRepo features, TestCaseRepo tests, ExecutionRepo execs,
                               AuthorRepo authors, AppUserRepo users){
    return args -> {
      if(apps.count()>0) return;
      ApplicationEntity a = new ApplicationEntity(); a.setName("E-Commerce Platform"); a.setVersionStr("2.4.1"); a.setDescription("Main customer-facing web application for online shopping"); apps.save(a);
      ApplicationEntity b = new ApplicationEntity(); b.setName("Admin Dashboard"); b.setVersionStr("1.8.3"); b.setDescription("Internal management system for store operations"); apps.save(b);
      ApplicationEntity c = new ApplicationEntity(); c.setName("Mobile App API"); c.setVersionStr("3.1.0"); c.setDescription("RESTful API serving the mobile applications"); apps.save(c);

      Feature f1 = new Feature(); f1.setApplication(a); f1.setName("Cart & Checkout"); f1.setDescription("Cart, checkout, and payments"); features.save(f1);
      Feature f2 = new Feature(); f2.setApplication(a); f2.setName("Catalog & PDP"); f2.setDescription("Product search and PDP"); features.save(f2);
      Feature f3 = new Feature(); f3.setApplication(b); f3.setName("User Management"); f3.setDescription("Roles & permissions"); features.save(f3);

      TestCase t1 = new TestCase(); t1.setApplication(a); t1.setFeature(f1); t1.setTitle("Guest checkout with VISA"); t1.setDescription("Verify guest checkout with credit card"); t1.setStatus("READY"); t1.setPriority("HIGH"); tests.save(t1);
      TestCase t2 = new TestCase(); t2.setApplication(a); t2.setFeature(f2); t2.setTitle("PDP inventory badge"); t2.setDescription("Inventory badge logic on PDP"); t2.setStatus("READY"); t2.setPriority("MEDIUM"); tests.save(t2);
      TestCase t3 = new TestCase(); t3.setApplication(b); t3.setFeature(f3); t3.setTitle("Create limited role"); t3.setDescription("RBAC role creation"); t3.setStatus("DRAFT"); t3.setPriority("HIGH"); tests.save(t3);

      Random r = new Random(9);
      for(int i=0;i<12;i++){ Execution e = new Execution(); e.setApplication(a); e.setTestCase(i%2==0?t1:t2); e.setStatus(r.nextBoolean()? "PASSED":"FAILED"); e.setDurationMs(700L + r.nextInt(700)); e.setExecutedAt(Instant.now().minusSeconds(3600L*(i+1))); execs.save(e); }
      for(int i=0;i<5;i++){ Execution e = new Execution(); e.setApplication(b); e.setTestCase(t3); e.setStatus(r.nextBoolean()? "PASSED":"FAILED"); e.setDurationMs(900L + r.nextInt(400)); e.setExecutedAt(Instant.now().minusSeconds(4500L*(i+1))); execs.save(e); }

      Author au = new Author(); au.setName("QA Lead"); au.setEmail("qa.lead@example.com"); authors.save(au);
      AppUser u = new AppUser();
      u.setUsername("admin");
      u.setDisplayName("Admin User");
      u.setRole("ADMIN");
      u.setPassword("password");
      users.save(u);
    };
  }
}
