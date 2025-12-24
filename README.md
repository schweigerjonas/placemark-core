## placemark-core

[![GitHub Release](https://img.shields.io/badge/release-v1.0.0-blue)](https://github.com/schweigerjonas/placemark-core/releases/tag/v2.0.0)

**placemark-core** is a web application built with the [Hapi](https://hapi.dev/) framework that allows users to register, log in, and manage points of interest. This application-core is focused on the backend of the project.

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)

## Features

- **User Management**: Register a new account, log in, update your profile or delete your account
- **Admin Dashboard**: A seeded admin account allows for managing all registered users
- **Category Management**: Users can create, update and delete categories for points of interest
- **POI Management**: Users can add points of interest to categories, update and delete them
- **API Service**: A REST API for all CRUD operations on users, categories and POIs, secured using JWT
- **API Documentation**: Complete documentation for all API endpoints, following the Open API standard
- **Testing**: Full test suite to ensure application reliability.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [NodeJS](https://nodejs.org/en) (LTS Version recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or hosted)
- [Cloudinary](https://cloudinary.com/) Account for storing images

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

# DB
# Local MongoDB database connection string
DB=mongodb://localhost/placemark-core
# MongoDB Atlas cluster connection string (enter your credentials here)
# DB=mongodb+srv://<db_user>:<db_password>@cluster.abcdef.mongodb.net/

# Cloudinary credentials for storing category and POI images
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

# Other variables (e.g., PORT)
# ...

```

### Running the Application

To start the mongo instance locally (in project root):

```bash
mongod --dbpath db/
```

To run in development mode (with monitoring/reloading):

```bash
npm run dev
```

To run in production/standard mode:

```bash
npm run start
```

The server will typically start on <http://localhost:3000> (or the port specified in your configuration).

## Testing

The project includes a test suite to cover the API endpoints and database interactions.

For the tests to work, both a mongo instance and the application have to run.

To run the full test suite:

```bash
npm run test
```

## API Documentation

Once the application is running, the interactive API documentation is available at:

> <http://localhost:3000/documentation> (adjust port if necessary)

This documentation provides details on all available endpoints, required parameters, and response schemas.

## Deployment

The application is deployed live at:

> <https://placemark-core.onrender.com/>

_Note: It may take 1-2 minutes until the instance is spun up upon first visiting the website._
