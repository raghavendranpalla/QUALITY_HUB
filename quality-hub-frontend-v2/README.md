# Quality Hub Frontend v2

- Dark, glassmorphism UI with gradients and pass-rate ring.
- Works with backend or in **mock mode** (no backend required).

## Run
```bash
npm install
# Mock mode (preview the graphics without backend):
set VITE_MOCK=1 && npm run dev        # Windows (cmd)
$env:VITE_MOCK='1'; npm run dev        # PowerShell
# Real backend:
set VITE_API_BASE=http://localhost:8080/api && npm run dev
```

Open http://localhost:5173
