# Spec: Zodiac Monthly Horoscope Web App

**Status:** approved

## Goal
Build a beautiful, interactive celestial-themed web application that calculates the user's Zodiac sign based on their date of birth, and predicts their luck and risk (vận may/rủi ro) for any selected month/year, utilizing a Node.js Express backend and a React frontend.

## Requirements
1. **Architecture (React + Express):**
   - **Frontend:** Built with React (bootstrapped with Vite) and styled using Vanilla CSS for maximum styling control and premium animations. It communicates with the backend via REST APIs.
   - **Backend:** A lightweight Node.js/Express server that handles the calculation of Zodiac signs and seed-based monthly horoscope predictions.
2. **API Endpoints:**
   - `POST /api/horoscope`:
     - Input: `{ birthDate: "YYYY-MM-DD", targetMonth: "YYYY-MM" }`
     - Output: Zodiac details (name, symbol, element, ruling planet) and monthly predictions (Overview, Career, Finance, Love, Health scores and challenges, Lucky elements).
3. **Zodiac Identification (Backend):**
   - The backend must correctly identify the Zodiac sign based on birthdate ranges.
4. **Monthly Predictions (Backend):**
   - The backend generates a deterministic, personalized luck/risk report using a pseudo-random seed based on the user's birthdate + selected month/year.
5. **Interactive UI & Visuals (Frontend - React):**
   - The React UI must feature a premium, celestial dark-mode theme (stars background, glowing neon highlights, glassmorphism containers).
   - Display a responsive dashboard showing predictions with custom UI indicators (e.g. progress rings or bar charts for scores) and dynamic lists for lucky elements.
   - Support smooth state transitions (loading spinner, error messages, card reveal animations).

## Out of scope
- Integration with external real-time astrologer consultations.
- Complex birth charts requiring birth location coordinates (longitude/latitude) and birth hour/minute accuracy.

## Acceptance criteria & E2E Scenarios
- [ ] **E2E Scenario 1: Happy Path - Successful Prediction Retrieval**
  - GIVEN the user inputs birthdate "1995-07-28" (Leo/Sư Tử) and selects month "July 2026",
  - WHEN they click "Xem Vận Mệnh",
  - THEN a loading state is shown, followed by the successful display of "Sư Tử (Leo)" details, scores for Career, Finance, Love, Health, and lucky elements (color, number, dates).
- [ ] **E2E Scenario 2: Validation and Error Handling**
  - GIVEN the user leaves the birthdate field empty or inputs an invalid format,
  - WHEN they click submit,
  - THEN the frontend prevents submission (or displays an error alert) and backend returns an appropriate validation error status (e.g., 400 Bad Request) with a user-friendly Vietnamese message.
- [ ] **E2E Scenario 3: Monthly Navigation & Prediction Determinism**
  - GIVEN the user retrieves predictions for "July 2026",
  - WHEN they change the target month to "August 2026" and submit,
  - THEN the UI displays new, different predictions for August, but returning to July 2026 reproduces the exact same horoscope results as before.
- [ ] React UI is built with Vite, is responsive, and uses custom vanilla CSS variables for dark celestial styling.
- [ ] Backend is built with Node.js/Express and performs input validation.
