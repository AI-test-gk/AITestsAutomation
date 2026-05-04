# AI Tests Automation

## 1. Project Overview

This repository contains an end-to-end UI automation framework built with Playwright and JavaScript for a SauceDemo-style web application.

### Purpose

- Provide reliable regression coverage for core user journeys (login, products, cart, checkout).
- Enforce maintainable test design using Page Object Model and reusable components.
- Support CI quality gates for both functional stability and dependency security.

### Technologies

- Node.js (LTS)
- JavaScript (ES Modules)
- Playwright Test
- ESLint + Prettier
- GitHub Actions
- npm audit (security scanning)
- Microsoft Teams webhook notifications (CI failure alerts)
- AI-assisted development workflow (Copilot-driven test/framework refactoring)

## 2. Framework Overview

The framework follows a layered architecture for readability and scalability.

- Test runner: Playwright Test
- Test specs: scenario-level validation in the tests folder
- Page Objects: page-level actions and locators in src/pages
- Components: reusable UI blocks (for example, product card interactions) in src/components
- Constants and test data: centralized values in src/constants
- Utilities: shared test exports and helpers in src/utils
- Reporting: Playwright HTML report and traces for debugging failed tests
- Integrations: GitHub Actions pipeline, Teams failure notifications

### AI usage in this project

AI is used to assist with test design and framework maintenance tasks such as:

- reducing duplicated test flows,
- improving locator organization,
- keeping Page Objects/components clean and reusable,
- generating consistent CI workflow updates.

## 3. Setup Instructions

### Prerequisites

- Node.js LTS (recommended: Node 20+)
- npm (comes with Node.js)
- Git
- Playwright browser dependencies (installed via Playwright command)

### Clone repository

```bash
git clone <REPO_URL>
cd AITestsAutomation
```

### Install dependencies

```bash
npm ci
npx playwright install --with-deps
```

### Environment variables

Create a local .env file (or export variables in your shell):

```env
BASE_URL=https://www.saucedemo.com/
```

GitHub Actions secret placeholders:

- TEAMS_WEBHOOK_URL: required for Teams failure notifications in CI
- OPTIONAL_API_KEY_PLACEHOLDER: add if future integrations need external APIs

## 4. Execution Steps

### Run all tests locally

```bash
npm test
```

### Run tests in headed mode

```bash
npm run test:headed
```

### Run tests with Playwright UI mode

```bash
npm run test:ui
```

### Open last HTML report

```bash
npm run report
```

### Run a specific test file

```bash
npx playwright test tests/login-page.spec.js
```

### Run by test title filter

```bash
npx playwright test -g "Should log in successfuly"
```

### Trigger via CI/CD

- Create or update a pull request to main.
- Push commits to main (if enabled in workflow triggers).

## 5. CI/CD Integration

GitHub Actions workflow file: .github/workflows/playwright-tests.yml

Pipeline includes:

- playwright-tests job:
  - installs dependencies,
  - installs Playwright browsers,
  - runs E2E tests,
  - uploads HTML report and traces as artifacts.
- security-scan job (runs in parallel):
  - runs npm audit,
  - fails on high or critical vulnerabilities,
  - appends a concise vulnerability summary to the Actions job summary.
- failure notification:
  - sends a Microsoft Teams message when the workflow fails,
  - includes PR metadata and run URL.

## 6. Project Structure

```text
.github/workflows/        CI/CD workflows
src/components/           Reusable UI components used by pages/tests
src/constants/            Test data and shared constant values
src/pages/                Page Object Model classes
src/utils/                Shared test exports and utilities
tests/                    Playwright spec files
playwright.config.js      Playwright configuration and runtime settings
```

## 7. Additional Notes

### Troubleshooting tips

- Browser install issues:
  - rerun npx playwright install --with-deps
- Environment/base URL issues:
  - verify BASE_URL in .env and confirm target environment is reachable
- Flaky failures:
  - inspect Playwright traces and HTML report artifacts
- CI Teams message not sent:
  - verify TEAMS_WEBHOOK_URL secret is present and valid

### Assumptions and limitations

- Current setup targets Chromium desktop project by default.
- Tests assume stable test-id attributes in the application under test.
- Security scan policy currently blocks on high/critical vulnerabilities only.
