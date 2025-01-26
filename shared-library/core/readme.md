# packages/shared-library/core/

This directory contains fundamental classes and utilities that are core to the development of applications within the monorepo.

**Purpose:**

* **Centralize Core Logic:** To provide a single source of truth for core functionalities and classes used across multiple applications.
* **Improve Reusability:** To enhance code reusability and reduce code duplication across the monorepo.
* **Improve Maintainability:** To make it easier to maintain and update core functionalities.

**Structure:**

```
packages/shared-library/core/
├── StateMachine.js 
├── EventBus.js 
├── Logger.js 
├── DataStore.js 
├── ...
```

**Allowed:**

* **Fundamental Classes:** Core classes that provide foundational building blocks for applications, such as:
    * **StateMachine:** For managing state transitions within applications.
    * **EventBus:** For facilitating communication between different parts of the application.
    * **DataStore:** For managing application data (e.g., local storage, session storage).
    * **Logger:** For logging events and debugging information.
* **Utility Functions:** Low-level utility functions that are broadly applicable across multiple applications, such as:
    * **Error handling utilities:** Functions for handling and logging errors.
    * **Type checking utilities:** Functions for type checking and validation.
    * **ID generation utilities:** Functions for generating unique IDs.

**Not Allowed:**

* **Application-specific logic:** Any logic that is specific to a particular application should not be placed here.
* **UI components:** UI components should be placed in the `packages/ui-components/` directory.
* **Domain-specific models:** Domain-specific models should be placed within the respective application.
