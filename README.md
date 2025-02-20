# E2E Test Automation

This repository contains an end-to-end (E2E) testing framework for the RMS application using **Cypress**. It includes utilities, API routes, and test cases to validate various business workflows.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Running Tests](#running-tests)
  - [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Utilities](#utilities)
- [Key Features](#key-features)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites

1. Node.js (v16+ recommended)
2. npm (v8+ recommended)
3. [Cypress](https://www.cypress.io/) installed globally or locally.

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/rms-e2e-test-automation.git
   cd rms-e2e-test-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Project Structure

```
.
├── cypress/
│   ├── e2e/                     # E2E Test files
│   ├── fixtures/                # Test data
│   ├── support/                 # Custom commands and hooks
├── helpers.ts                   # Shared utility functions
├── api-routes.ts                # API endpoint definitions
├── types/                       # TypeScript type definitions
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
```

---

## Usage

### Running Tests

#### Locally in a Headed Browser:

```bash
npm run e2e:dev
```

#### Headless Mode (Chrome):

```bash
npx cypress run --browser chrome
```

#### Record Tests to Cypress Dashboard:

Ensure you have set the `CYPRESS_RECORD_KEY` environment variable, then run:

```bash
npx cypress run --record
```

---

### Environment Variables

Some tests may require secrets or tokens. Ensure the following environment variables are set:

- `CYPRESS_RECORD_KEY`: Your Cypress Dashboard record key.

---

## API Routes

### Authentication

| Endpoint    | Description        |
| ----------- | ------------------ |
| `/v1/login` | Login API endpoint |

### Business

| Endpoint                                       | Description                           |
| ---------------------------------------------- | ------------------------------------- |
| `/v1/businesses`                               | Base business endpoint                |
| `/v1/business-locations`                       | Create or retrieve business locations |
| `/v1/business-locations/{id}/status`           | Update a business location's status   |
| `/v1/business-locations/{id}/set-headquarters` | Set a location as headquarters        |

### Geo

| Endpoint                               | Description                      |
| -------------------------------------- | -------------------------------- |
| `/v1/states?pageSize=1000&countryId=*` | Fetch states for a given country |
| `/v1/cities?stateId=*`                 | Fetch cities for a given state   |
| `/v1/countries`                        | Fetch all available countries    |

---

## Utilities

### `helpers.ts`

Provides shared utility functions such as:

- `generatePhoneNumber()`: Generates a valid Nigerian phone number.
- `fetchIdsForCountryStateCity(accessToken)`: Fetches `countryId`, `stateId`, and `cityId` for Nigeria.

---

## Key Features

- **Dynamic API Interception**:
  - Intercepts and validates API requests and responses during tests.
- **Test Data Management**:
  - Supports dynamic creation of branches using `faker`.
- **Flexible Assertions**:
  - Includes utilities to verify branch existence, status, and table length dynamically.

---

## Contributing

We welcome contributions to this repository! Please ensure you follow the guidelines below when contributing:

### Commit Message Guidelines

All commit messages should follow the **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)** standard. The structure should follow this pattern:

```
<type>(<scope>): <subject>
```

#### Examples:

- `feat(auth): add login API support`
- `fix(branch): resolve table visibility issue`
- `chore: update Cypress to the latest version`

### Steps to Contribute

1. Fork this repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes following the Conventional Commits standard:
   ```bash
   git commit -m "feat(auth): add login functionality"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

Happy Testing! 🚀
