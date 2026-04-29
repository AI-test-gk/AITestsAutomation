# Playwright Test Automation Framework

## Stack

- JavaScript
- Playwright

## Project Structure

- `src/pages` - Page Object classes
- `src/components` - Reusable UI components
- `src/utils` - Test utilities and base test setup
- `src/fixtures` - Static test data
- `tests/e2e` - End-to-end test specs

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Run Tests

- Headless:
  ```bash
  npm test
  ```
- Headed:
  ```bash
  npm run test:headed
  ```
- HTML report:
  ```bash
  npm run report
  ```
