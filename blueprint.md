# Muscle Anatomy Explorer

## Overview

This project is an interactive web application designed to help users learn the names and locations of the major muscles in the human body. It provides a visually engaging and informative experience using modern web technologies.

## Design and Features

### Visual Design
*   **Layout:** A responsive two-column layout. The left column displays an interactive muscle diagram, and the right column shows information about the selected muscle.
*   **Color Palette:** A modern and energetic palette with a dark background, vibrant accents for highlighting, and clear, legible text.
*   **Typography:** Expressive fonts to create a clear visual hierarchy (headings, body text).
*   **Iconography:** Icons will be used for navigation and to enhance understanding.
*   **Effects:** Subtle animations and "glow" effects on interactive elements to improve user experience. A noise texture on the background will provide a tactile feel.

### Features
*   **Interactive Diagram:** A central SVG image of the human muscular system where each muscle group is an interactive element.
*   **Muscle Information Panel:** Displays the name and a brief description of the muscle the user clicks on.
*   **Web Components:** The muscle information panel will be a custom element (`<muscle-info>`) to encapsulate its structure and behavior.
*   **Modern CSS:** The application will be styled using modern CSS features like CSS Variables, Flexbox for layout, and `:has()` for complex selections if needed.
*   **ES Modules:** JavaScript will be organized into modules for better maintainability.

## Current Plan

1.  **Create the initial HTML structure** for the header, main content area (for the diagram and info panel), and footer.
2.  **Develop the CSS stylesheet** to implement the dark theme, responsive layout, and initial styling for the components.
3.  **Create an SVG of the muscular system** to be used as the interactive diagram.
4.  **Implement the main JavaScript file (`main.js`)** to handle:
    *   Loading muscle data.
    *   Handling click events on the SVG muscle groups.
    *   Dynamically updating the muscle information panel.
5.  **Create the `<muscle-info>` Web Component** to display details of a selected muscle.
