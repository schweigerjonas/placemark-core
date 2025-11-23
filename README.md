## placemark-core

**placemark-core** is a web application built with the [Hapi](https://hapi.dev/) framework that allows users to register, log in, and manage points of interest. This core of the application is focused on the backend of the application. The associated [Svelte](https://svelte.dev/) frontend can be found [here]().

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## Features

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

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

Create a file named .env in the root directory and add your configuration variables. At a minimum, you'll need:

```bash
# Cookie credentials
COOKIE_NAME=placemark-core
COOKIE_PASSWORD=YOUR_PERSONAL_PASSWORD_HERE

# MongoDB connection string
DB=mongodb://localhost/placemark-core

# Cloudinary credentials
CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_SECRET=YOUR_CLOUDINARY_SECRET

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
npm start
```

The server will typically start on <http://YOUR_HOSTNAME:3000> (or the port specified in your configuration).

## Testing

The project includes a test suite to cover the API endpoints, database interactions, and authentication logic.

To run the full test suite:

```bash
npm test
```

## API Documentation

Once the application is running, the interactive API documentation is available via Swagger:

Access the documentation at:

> <http://YOUR_HOSTNAME:3000/documentation> (adjust port if necessary).

This documentation provides details on all available endpoints, required parameters, and response schemas.

## Deployment

The application is deployed and live at:

> </>

_Note: It may take 1-2 minutes until the instance is spun up upon first visiting the website._
