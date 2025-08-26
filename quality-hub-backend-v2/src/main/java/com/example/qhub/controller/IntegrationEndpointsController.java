package com.example.qhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.*;

@RestController @RequestMapping("/api/integration-endpoints")
public class IntegrationEndpointsController {
  private final RequestMappingHandlerMapping mapping;
  @Autowired public IntegrationEndpointsController(RequestMappingHandlerMapping m){ this.mapping=m; }

  @GetMapping("/schema")
  public List<Map<String,Object>> list(){
    List<Map<String,Object>> out = new ArrayList<>();
    for (Map.Entry<RequestMappingInfo, HandlerMethod> e: mapping.getHandlerMethods().entrySet()){
      Set<String> paths = e.getKey().getPathPatternsCondition()!=null ? e.getKey().getPathPatternsCondition().getPatternValues() : Set.of();
      Set<String> methods = e.getKey().getMethodsCondition()!=null ?
        e.getKey().getMethodsCondition().getMethods().stream().map(Enum::name).collect(java.util.stream.Collectors.toSet()) :
        Set.of("GET","POST","PUT","DELETE","PATCH","OPTIONS");
      for(String p: paths){
        Map<String,Object> m = new LinkedHashMap<>();
        m.put("path", p); m.put("methods", methods); m.put("handler", e.getValue().getMethod().getName());
        out.add(m);
      }
    }
    out.sort(java.util.Comparator.comparing(m -> m.get("path").toString()));
    return out;
  }
}
