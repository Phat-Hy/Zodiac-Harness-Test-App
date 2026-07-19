# Code Review: Zodiac Monthly Horoscope Web App

**Status:** completed
**Reviewer:** Independent Reviewer Subagent & Antigravity (Inline)
**Date:** 2026-07-19

## Summary of Findings and Fixes

We reviewed `backend/zodiac-logic.js`, `backend/server.js`, `frontend/src/App.jsx`, `frontend/src/components/StarryBackground.jsx`, and `package.json` for **Correctness**, **Security**, **Performance**, **Quality**, and **Test Coverage**.

### 1. Correctness
* **[Fixed] Timezone-dependent Date component parsing**
  * **File:** [zodiac-logic.js:L126-L132](file:///C:/Users/hypha/Documents/Harness/Zodiac/backend/zodiac-logic.js#L126-L132)
  * **Issue:** Local getters `date.getMonth()` and `date.getDate()` were used on UTC-parsed date-only strings, causing incorrect Zodiac sign classification in non-UTC timezones.
  * **Fix:** Replaced with UTC component getters `date.getUTCMonth()` and `date.getUTCDate()`.

### 2. Quality / Maintainability
* **[Fixed] Unified Test Command**
  * **File:** [package.json:L12](file:///C:/Users/hypha/Documents/Harness/Zodiac/package.json#L12)
  * **Issue:** Missing standard `"test"` command in the root package manager scripts.
  * **Fix:** Added `"test": "node backend/test-logic.js && node tests/e2e.test.js"` which triggers all checks sequentially.
* **[Fixed] Redundant/Dead Code Cleanup**
  * **File:** [zodiac-logic.js:L134-L157](file:///C:/Users/hypha/Documents/Harness/Zodiac/backend/zodiac-logic.js#L134-L157)
  * **Issue:** Redundant duplicate checks for Capricorn and dead fallback logic.
  * **Fix:** Simplified matching loop and simplified fallbacks.

### 3. Performance
* **[Fixed] Starry Canvas Resize Distribution**
  * **File:** [StarryBackground.jsx:L66-L82](file:///C:/Users/hypha/Documents/Harness/Zodiac/frontend/src/components/StarryBackground.jsx#L66-L82)
  * **Issue:** Stars did not wrap when window bounds were increased, causing blank areas.
  * **Fix:** Added coordinates wrapping check within the animation update loop to distribute stars uniformly.

### 4. Security & Future Extensions (Out of Scope / Suggestions)
* **[Suggestion] Rate Limiting:** Add `express-rate-limit` middleware on `POST /api/horoscope` to protect against DoS or scraping attacks.
* **[Suggestion] CORS Configuration:** Whitelist origins in production instead of using wildcard `cors()`.
* **[Suggestion] Playwright E2E:** Introduce real headless browser automation tests in addition to backend API E2E checks.
