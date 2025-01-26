# packages/shared-library/utils/

This directory contains utility functions and helpers that can be reused across multiple applications within the monorepo.

**Purpose:**

* **Centralize utility functions:** To provide a single source of truth for commonly used utility functions.
* **Improve code reusability:** To avoid duplicating utility code across different applications.
* **Enhance maintainability:** To make it easier to update, maintain, and improve utility functions across the entire monorepo.

**Structure:**

```
packages/shared-library/utils/
├── math
├── array
├── main
├── colors
└── ... 
```

**Allowed:**

* **General purpose utility functions:** 
    * **Data manipulation:** Array manipulation, object manipulation, string manipulation, date/time handling.
    * **Math utilities:** Mathematical calculations, number formatting.
    * **DOM manipulation (if applicable):** Functions for interacting with the DOM (e.g., getting/setting element attributes, event handling).
    * **Storage utilities:** Functions for working with local storage, session storage, or other storage mechanisms.
    * **Validation functions:** Functions for validating data (e.g., email, phone number, URL).
    * **Helper functions for common tasks:** 
        * e.g., debouncing, throttling, generating unique IDs, etc.

**Not Allowed:**

* **Application-specific logic:** Functions that are specific to a particular application should not be placed here.
* **UI components:** UI components should be placed in a separate `ui-components` directory.
* **Business logic:** Business logic should be handled within the application's specific domain.