# packages/shared-library/core/styles/

This directory contains shared styles, including Sass and CSS, that can be reused across multiple applications within the monorepo.

**Purpose:**

* **Centralize Styles:** To provide a single source of truth for shared styles, ensuring consistency and reducing duplication.
* **Improve Maintainability:** To make it easier to update, maintain, and improve styles across the entire codebase.
* **Enhance Code Reusability:** To promote the reuse of common styles and design patterns.

**Structure:**

```
packages/shared-library/styles/
├── main.scss
├── _reset.scss
├── _variables.scss
├── _mixins.scss
├── components/
│   ├── button.scss
│   ├── input.scss
│   ├── dropdown.scss
│   └── ... 
├── layouts/
│   ├── grid.scss
│   ├── header.scss
│   └── footer.scss
├── utils/
│   ├── functions.scss
│   └── placeholders.scss
├── css/
│   ├── main.css
```

* **`main.css`:** 
* **`_reset.css`:** Contains CSS resets to normalize browser defaults.
* **`_variables.scss`:** Defines global variables for colors, spacing, font sizes, and other design tokens.
* **`_mixins.scss`:** Contains Sass mixins for common CSS patterns (e.g., border-radius, box-shadow, transitions, breakpoints).
* **`layouts/`:** Contains styles for common layouts and grid systems.
* **`utils/`:** 
* **`css/`:** Directory to translate scss into css. 


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

# Sass Project Structure for a Shared-Library

This document outlines a recommended structure for a Sass project within a shared-library, designed to serve as a default set of styles for multiple applications.

**1. Project Root:**

*   `_variables.scss`: Global variables for colors, fonts, spacing, breakpoints, etc.
*   `_mixins.scss`: Collection of reusable Sass mixins (e.g., for vendor prefixes, transitions, clearfix).
*   `_base.scss`: Base styles for HTML elements (e.g., body, h1-h6, p, a, ul, ol).
*   `_layout.scss`: Styles for layout elements (e.g., grid system, containers, headers, footers).
*   `_typography.scss`: Typography rules (e.g., font families, font sizes, line heights, letter spacing).

**2. Components:**

*   `components/`: 
    *   `button.scss`
    *   `input.scss`
    *   `dropdown.scss`
    *   `modal.scss`
    *   `...other components...`

**3. Utilities:**

*   `utilities/`:
    *   `helpers.scss` (e.g., visibility, position, spacing utilities)
    *   `animations.scss`

**4. Themes (Optional):**

*   `themes/`:
    *   `light.scss`
    *   `dark.scss`
    *   `brand.scss`

**5. Main Stylesheet:**

*   `main.scss`:

**6. Compilation:**

*   Use a tool like Node-Sass or Dart Sass to compile the `style.scss` file into a CSS file (e.g., `style.css`) for distribution.

**Key Considerations:**

*   **Naming Conventions:** Use consistent and descriptive naming conventions for files and variables.
*   **Organization:** Keep your Sass files well-organized and easy to navigate.
*   **Documentation:** Add comments within your Sass files to explain the purpose of variables, mixins, and styles.
*   **Version Control:** Use a version control system (like Git) to track changes and collaborate effectively.
*   **Testing:** Consider using a CSS testing framework to ensure that your styles work as expected across different browsers and devices