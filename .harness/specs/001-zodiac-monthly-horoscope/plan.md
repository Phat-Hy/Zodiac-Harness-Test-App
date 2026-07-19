# Plan: Zodiac Monthly Horoscope Web App

**Status:** approved

**Baseline:** none -> First implementation from scratch.

## Task 1: Project Setup & Dev Environment (React + Express)
- Spec: Architecture (React + Express)
- Files:
  - `package.json` (root)
  - `backend/package.json`
  - `backend/server.js`
  - `frontend/package.json`
  - `frontend/vite.config.js`
- Do:
  - Create root `package.json` to run frontend and backend concurrently.
  - Set up `backend/server.js` with Express, configuring a placeholder `POST /api/horoscope` endpoint.
  - Bootstrap `frontend/` using Vite with React. Configure a proxy in `vite.config.js` so that requests to `/api` are forwarded to the Express server.
- Verify: Start both servers via `npm run dev` and perform a curl request to verify proxying works.

## Task 2: Backend Zodiac & Horoscope Logic
- Spec: API Endpoints, Zodiac Identification, Monthly Predictions
- Files:
  - `backend/zodiac-logic.js`
  - `backend/server.js`
- Do:
  - Implement the date ranges for all 12 Zodiac signs.
  - Implement a deterministic prediction generator using a hash (e.g., a simple custom seed-based generator) that converts a birthdate + month + year string into reproducible scores and Vietnamese forecast templates.
  - Validate API inputs (valid date format and valid month format) and return 400 Bad Request if invalid.
- Verify: Create a script `backend/test-logic.js` to assert calculation correctness and determinism.

## Task 3: React Frontend Celestial UI
- Spec: Interactive UI & Visuals (Frontend - React)
- Files:
  - `frontend/src/App.jsx`
  - `frontend/src/App.css`
  - `frontend/src/components/`
- Do:
  - Design a beautiful, immersive dark-space theme (deep blue/purple, glowing card containers, twinkling CSS stars, elegant typography).
  - Build the input form (birthdate selection, month selector).
  - Implement API fetching, loading states, and result rendering with customized visual star meters, progress bars, and prediction cards.
- Verify: Run application locally, interact with the UI, and visually inspect responsive layouts on desktop and mobile viewports.

## Task 4: End-to-End (E2E) Test Suite
- Spec: Acceptance criteria & E2E Scenarios (Scenarios 1, 2, and 3)
- Files:
  - `tests/e2e.test.js`
  - `package.json`
- Do:
  - Set up a lightweight E2E test runner (e.g., using Puppeteer, Playwright, or a custom Selenium/JSDOM script) to run the 3 scenarios:
    1. **Scenario 1:** Happy path validation (entering 1995-07-28 and July 2026 renders Leo horoscope with stats).
    2. **Scenario 2:** Input validation check (missing date shows error message without API call).
    3. **Scenario 3:** Determinism check (July 2026 -> August 2026 -> July 2026 results are stable).
- Verify: Run the E2E test suite command and ensure all 3 scenarios pass.

