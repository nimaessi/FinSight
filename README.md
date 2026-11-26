# FinSight

**FinSight** is a desktop application for importing Excel financial
reports and presenting their data in a clean, modern management
dashboard.

## Overview

FinSight is being developed to make financial reports easier to read and
review. Instead of working directly with complex Excel layouts, users
can import an Excel workbook and view its information in a structured
report inside the application.

The initial development phase focuses on:

-   Importing Excel files (`.xlsx` and `.xls`).
-   Extracting purchase-report data from the workbook.
-   Presenting the extracted information in a modern dashboard.
-   Keeping the application structure ready for future report export
    features.

## Current Features

-   Excel file selection and import.
-   Parsing of the current purchase-report workbook structure.
-   Management-style report sections and summary cards.
-   Financial breakdowns, settlement information, tax balance, invoice
    details, and related period information.
-   Persian / right-to-left user interface.
-   FinSight splash screen with animated branding.

> The current scope is focused on importing and displaying report data.
> Accounting calculations and broader business workflows are not part of
> this phase.

## Technology Stack

-   **Electron** — desktop application runtime.
-   **React** — renderer user interface.
-   **TypeScript** — application typing.
-   **Tailwind CSS** — UI styling.
-   **SheetJS (`xlsx`)** — Excel workbook reading.

## Project Structure

The source code is organized into separate Electron processes and shared
contracts:

```text
src/
├── main/       # Electron main process and application services
├── preload/    # Secure bridge between main and renderer
├── renderer/   # React application and user interface
└── shared/     # Shared TypeScript contracts and types

resources/      # Desktop application assets and icons
```

## Architecture Notes

-   The renderer communicates with Electron through a limited API
    exposed by the preload script.
-   `contextIsolation` should remain enabled.
-   `nodeIntegration` should remain disabled.
-   Shared data contracts are kept in `src/shared/contracts` so the main
    and renderer processes use consistent types.
-   `@/` is an absolute import alias for `src/` across the Electron main,
    preload, and renderer code (for example, `@/shared/contracts/...`).
-   Excel reading and parsing are kept outside React components.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the application in development mode:

```bash
npm run dev
```

Build commands depend on the Electron tooling configured in this
repository.

## Current Development Status

**Phase 0 — Excel import and report presentation**

The current milestone is to validate the extracted values against the
source workbook and ensure the report renders correctly. Exporting
reports to HTML or PDF can be added after this validation.

## Future Direction

Potential next steps include:

-   Exporting reports to PDF.
-   Exporting reports to standalone HTML.
-   Supporting additional Excel report templates.
-   Improving validation and error handling for incomplete or unexpected
    workbooks.

## License

Add the project's license and ownership information here before public
distribution.
