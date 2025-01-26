```markdown
# packages/ui-components

This directory houses all reusable UI components used across the monorepo.

**Purpose:**

* **Centralize UI components:** To provide a single source of truth and a consistent look and feel across all applications within the monorepo.
* **Improve code reusability:** To avoid duplication of UI logic and enhance code maintainability.
* **Facilitate component sharing:** To easily share and reuse UI components between different applications within the monorepo.

**Structure:**

Each component typically resides in its own subdirectory:

```
packages/ui-components/
  ├── Button/ 
  │   ├── Button.js 
  │   ├── Button.stories.js 
  │   ├── Button.test.js 
  │   ├── Button.styles.css 
  │   └── index.js 
  ├── Input/ 
  │   ├── Input.js 
  │   ├── Input.stories.js 
  │   ├── Input.test.js 
  │   └── Input.styles.css 
  ├── Dropdown/ 
  │   ├── ...
  ├── Modal/ 
  │   ├── ...
  └── ...
```
```

* **`index.js`:** Exports the default component for easy import (optional).

**What belongs here:**

* **Presentational and container components:** 
    * Reusable UI elements like buttons, input fields, dropdowns, modals, tables, and other interactive elements.
* **Styled components:** If using a CSS-in-JS library, style-related files for each component.
* **Component tests:** Unit tests for each component to ensure proper functionality and behavior.
* **Storybook stories:** (Optional) Stories for each component to showcase its usage and variations in a visual format.

**What does NOT belong here:**

* **Application-specific UI:** UI components that are specific to a single application should reside within that application's directory.
* **Business logic:** Business logic should be placed in appropriate services or controllers within the application.
