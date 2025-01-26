# shared-library

This directory contains shared libraries, utilities, and data that can be reused across multiple applications within the monorepo.

## Structure

* **constants/:** Contains constants used throughout the monorepo.
    * `apiConstants.js`: Defines API endpoints, base URLs, and headers.
    * `uiConstants.js`: Defines UI colors, breakpoints, and other UI-related constants.
* **utils/:** Contains utility functions that can be reused across multiple projects.
    * `mathUtils.js`: Functions for mathematical operations (e.g., sum, average, random).
    * `stringUtils.js`: Functions for string manipulation (e.g., capitalize, slugify, format).
    * `dateUtils.js`: Functions for date and time manipulation.
    * `httpUtils.js`: Functions for making HTTP requests.
    * `fileUtils.js`: Functions for working with files (e.g., reading, writing, uploading).
* **data/:** Stores static data files that are used by multiple projects.
    * `countries.json`: A JSON file containing a list of countries.
    * `currencies.json`: A JSON file containing currency data.
    * `lookups.json`: Lookup tables for various data.
* **services/:** (Optional) Contains higher-level services that encapsulate business logic or interact with external systems.
    * `authService.js`: Handles user authentication and authorization.
    * `paymentService.js`: Handles payment processing.
    * `notificationService.js`: Handles sending notifications.
* **types/:** (Optional) Contains TypeScript type definitions for the library's components and functions, improving code maintainability and reducing errors.

## Usage

* **Import and use:** Import and use the desired functions, constants, or data from the shared library within your applications: