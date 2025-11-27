## placemark-core

[![GitHub Release](https://img.shields.io/badge/release-v1.0.0-blue)](https://github.com/schweigerjonas/placemark-core/releases/tag/v1.0.0)

**placemark-core** is a web application built with the [Hapi](https://hapi.dev/) framework that allows users to register, log in, and manage points of interest. This application-core is focused on the backend of the project.

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Testing](#testing)

## Features

- **User Management**: Register a new account, log in, update your profile or delete your account
- **POI Management**: Users can create and update points of interest
- **API Service**: A REST API for all CRUD operations on users and POIs
- **Testing**: Full test suite to ensure application reliability.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [NodeJS](https://nodejs.org/en) (LTS Version recommended)

### Installation

Clone the repository:

```bash
git clone git@github.com:schweigerjonas/placemark-core.git
cd placemark-core
```

Install dependencies:

```bash
npm install
```

Configure Environment Variables:

Create a file named `.env` in the root directory and add your configuration variables. At a minimum, you'll need:

```bash
# Cookie credentials
COOKIE_NAME=placemark-core
COOKIE_PASSWORD=YOUR_PERSONAL_PASSWORD_HERE

# Other variables (e.g., PORT)
# ...

```

### Running the Application

To run in development mode (with monitoring/reloading):

```bash
npm run dev
```

To run in production/standard mode:

```bash
npm run start
```

The server will typically start on <http://YOUR_HOSTNAME:3000> (or the port specified in your configuration).

## Testing

The project includes a test suite to cover the API endpoints and database interactions.

To run the full test suite:

```bash
npm run test
```
