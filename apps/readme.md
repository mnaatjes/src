# apps

This directory contains all the individual applications within this monorepo.

**Purpose:**

* To hold self-contained, deployable applications.
* To enable independent development and deployment of each application.
* To provide a clear separation between applications and shared libraries.

**Structure:**

* **`package.json`:**
    * Defines application-specific dependencies.
    * Contains scripts for building, starting, testing, and deploying the application.
    * May extend or override scripts defined in the root `package.json`.

* **`src/`:** 
    * Contains the main source code for the application.
    * May include subdirectories for organizing code (e.g., `routes`, `controllers`, `models`, `services`, `components`).

* **`public/`:** 
    * (If applicable) Contains static assets like CSS, images, and JavaScript files.

* **`config/`:** 
    * Contains configuration files for the application (e.g., environment variables, database connection settings).

* Each application resides in its own subdirectory within this directory, following this general structure:



  ```
  apps/
    ├── app1/ 
    │   ├── package.json 
    │   ├── src/ 
    │   │   ├── index.js 
    │   │   ├── ... 
    │   └── ...
    ├── app2/ 
    │   ├── package.json 
    │   ├── src/ 
    │   │   ├── index.js 
    │   │   ├── ... 
    │   └── ...
    └── ...
```
