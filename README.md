# qa-cypress-framework

Portfolio project for web app test automation with Cypress.

Target app under test: `jaktestowac/rolnopol` Docker image.

## Tech stack

- Cypress (E2E)
- Node.js / npm
- Docker

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

- Node.js 18+ (recommended: latest LTS)
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

## Notes

- Current image tag used in scripts: `1.0.113`.
- If a container named `rolnopol-app` already exists, remove it before running `npm run app:up` again.
