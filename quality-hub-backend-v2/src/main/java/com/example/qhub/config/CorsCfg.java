package com.example.qhub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsCfg {
  @Value("${qualityhub.cors.allowed-origins:http://localhost:*}")
  private String allowedOrigins;

  @Bean
  public CorsFilter corsFilter(){
    CorsConfiguration cfg = new CorsConfiguration();
    Arrays.stream(allowedOrigins.split(","))
          .map(String::trim)
          .forEach(cfg::addAllowedOriginPattern);
    cfg.addAllowedMethod("*");
    cfg.addAllowedHeader("*");
    cfg.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
    src.registerCorsConfiguration("/**", cfg);
    return new CorsFilter(src);
  }
}
