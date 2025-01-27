# packages/shared-library/core/styles/

This directory contains shared styles, including Sass and CSS, that can be reused across multiple applications within the monorepo.

**Purpose:**

* **Centralize Styles:** To provide a single source of truth for shared styles, ensuring consistency and reducing duplication.
* **Improve Maintainability:** To make it easier to update, maintain, and improve styles across the entire codebase.
* **Enhance Code Reusability:** To promote the reuse of common styles and design patterns.

**Structure:**

```
packages/shared-library/core/styles/
├── base.scss 
├── variables.scss 
├── mixins.scss 
├── layouts.scss 
├── reset.css 
├── normalize.css 
├── ... 
```

* **`base.scss`:** Contains base styles such as global font styles, default colors, and basic resets.
* **`variables.scss`:** Defines global variables for colors, spacing, font sizes, and other design tokens.
* **`mixins.scss`:** Contains Sass mixins for common CSS patterns (e.g., border-radius, box-shadow, transitions, breakpoints).
* **`layouts.scss`:** Contains styles for common layouts and grid systems.
* **`reset.css`:** Contains CSS resets to normalize browser defaults.
* **`normalize.css`:** Includes the Normalize.css library for consistent browser styling.

**Sass File Schema:**

* **Naming Convention:** Use descriptive and consistent file names (e.g., `_variables.scss`, `_mixins.scss`).
* **Organization:** Organize Sass files into logical groups (e.g., `base`, `components`, `utilities`).
* **Nested Rules:** Utilize Sass's nesting features to improve readability and maintainability.
* **Variables:** Define and use variables extensively to improve flexibility and maintainability.
* **Mixins:** Create reusable mixins for common CSS patterns.
* **Comments:** Add comments to explain the purpose and usage of variables, mixins, and styles.

**Preprocessing:**

* **Use a CSS preprocessor:** Utilize a CSS preprocessor like Sass to leverage its features (variables, mixins, nesting) and improve code maintainability.
* **Compile Sass to CSS:** Compile Sass files into CSS using a build tool like Node Sass or Dart Sass.
* **Include compiled CSS in applications:** Import the compiled CSS files into your application's stylesheets.

**Usage:**

* **Import styles:** Import shared styles into your application's stylesheets:

```scss
@import '../../shared-library/core/styles/base.scss';
@import '../../shared-library/core/styles/variables.scss';
```