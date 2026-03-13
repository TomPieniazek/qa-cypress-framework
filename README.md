# qa-cypress-framework

Portfolio project for web app test automation with Cypress.

Target app under test: `jaktestowac/rolnopol` Docker image.

## Tech stack

- Cypress (E2E)
- Node.js / npm
- Docker
- Allure reporting
- Faker (test data)

## Project structure

```text
cypress/
  e2e/
    smoke.cy.js
  fixtures/
  support/
    e2e.js
cypress.config.js
package.json
```

## Prerequisites

- Node.js 20+ (recommended: latest LTS)
- Docker Desktop (or Docker Engine)

## Install dependencies

```bash
npm install --save-dev cypress
```

## Start app under test

```bash
npm run app:up
```

App should be available at `http://localhost:3000`.

To stop and remove container:

```bash
npm run app:down
```

## Run tests

Headless run:

```bash
npm test
```

Open Cypress UI:

```bash
npm run cy:open
```

## Allure reporting

Allure results are written to `allure-results` after each Cypress run.

Generate a static report:

```bash
npm run allure:generate
```

Open the report:

```bash
npm run allure:open
```

Or serve results directly:

```bash
npm run allure:serve
```

Note: Allure report generation requires Java to be installed.

## Notes

- Current image tag used in scripts: `1.0.113`.
- If a container named `rolnopol-app` already exists, remove it before running `npm run app:up` again.
