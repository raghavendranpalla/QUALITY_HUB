# Quality Hub Backend v2

Run (requires Java 17 and Maven):
```
mvn spring-boot:run
```

Dev endpoints:
- `GET /api/entities/Application`
- `GET /api/entities/Application/{id}`
- `POST/PUT /api/entities/Application`
- `GET/POST/PUT/DELETE /api/apps/{appId}/features`
- `GET/POST/PUT/DELETE /api/apps/{appId}/testcases`
- `GET/POST /api/apps/{appId}/executions`
- `GET /api/entities/{Author|User|Exception}`
- `GET /api/activity`
- `GET /api/integration-endpoints/schema`
