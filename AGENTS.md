# Agent Guidelines for vscode-mermaid-syntax-highlight

This repository provides Markdown syntax support for the Mermaid charting language in VS Code. It uses TextMate grammars defined in YAML and compiled to JSON.

## 1. Build, Lint, and Test

### Dependencies

- **Install:** `npm install`

### Grammar Compilation

**Crucial:** The source of truth for grammars is in `syntaxes/`. The VS Code extension uses JSON files in `out/`, which are generated from the YAML files.

- **Compile YAML to JSON:** `npm run convertYaml`
- **Watch/Auto-compile:** Not explicitly provided, so run `npm run convertYaml` manually after any change to `syntaxes/**/*.yaml`.

### Testing

Tests verify that the generated grammar correctly scopes the Mermaid code.

- **Run All Tests:** `npm test`
- **Run Single Test File:**
  ```bash
  npx vscode-tmgrammar-test "tests/diagrams/graph.test.mermaid"
  ```
- **Recommended Workflow:**
  Always compile before testing to ensure your changes are active.
  ```bash
  npm run convertYaml && npm test
  ```

### Packaging

- **Create VSIX:** `npx @vscode/vsce package`

### Formatting

- **Format Code:** `npm run format:write` (uses Prettier on `syntaxes/`)

## 2. Code Style & Conventions

### Grammar Definitions (`syntaxes/`)

- **Format:** YAML files in `syntaxes/diagrams/`.
- **Required Tests:** Every diagram grammar file must have one or more associated test files in `tests/diagrams/`. Tests are required to validate the grammar scoping and prevent regressions.
- **Custom YAML Tag `!regex`:**

  - Use `!regex |-` for all non-trivial regular expressions.
  - This allows multiline regexes with comments, which are stripped during compilation.
  - **Structure pattern:** Split the regex into multiple lines, with each line corresponding to a capture group. This makes it easier to match the regex with the associated capture group definition.

  **Example:**

  ```yaml
  match: !regex |-
    ^\s*(subgraph)\s+ # Matches the subgraph keyword
    (\w+)             # Matches the subgraph ID
  captures:
    '1':
      name: keyword.control.mermaid
    '2':
      name: variable
  ```

  **Becomes (in JSON):** `^\\s*(subgraph)\\s+(\\w+)`

- **Scopes:** Use standard TextMate scope names where possible.
  - `keyword.control.mermaid`: Keywords like `graph`, `subgraph`, `end`.
  - `entity.name.function.mermaid`: Names of diagrams or major sections.
  - `variable`: Node IDs, variables.
  - `string`: Text content, labels.
  - `comment`: Comments (`%%`).

### Test Files (`tests/`)

- **Format:** `.test.mermaid` (or `.md`, `.mdx`) files.
- **Whitespace Awareness:** These files are whitespace-aware. You must maintain consistent tabs/spacing throughout the file to avoid test errors.
- **Scope Assertion Rules:**
  - **Every non-commented line must have corresponding scope assertions below it.**
  - **Every non-whitespace character on the test line must have a corresponding scope validation line below it.** Assertions should not cover whitespace characters (spaces, tabs) - only test actual content.
  - Use comments (`%%`) for assertion lines - these are ignored by Mermaid but read by the test framework.
  - Assertion lines must directly follow the line they are testing (no blank lines between).
- **Defining Scopes:** There are two ways to identify the expected scope for a token:
  1. **Arrow (`<-----`):** Used when the text to check is at the very beginning of the line. The number of dashes corresponds to the number of characters from the start of the line to check.
     ```mermaid
     graph TD
     %% <----- keyword.control.mermaid
     %%     ^^ entity.name.function.mermaid
     ```
  2. **Caret (`^^^^`):** Used to check specific spans of text. The carets must align vertically with the characters on the line above.
     ```mermaid
     ID-1
     %%^^^^ variable
     ```

**Example of complete scope coverage:**

```mermaid
graph TD
%%^^^^^ keyword.control.mermaid
%%    ^^ entity.name.function.mermaid
    A[Start]
%%  ^ variable
%%   ^ punctuation.section.group.begin.mermaid
%%    ^^^^^ string.quoted.double.mermaid
%%         ^ punctuation.section.group.end.mermaid
```

In this example:

- `graph TD` - "graph" is tested (5 chars at positions 1-5), then "TD" is tested (2 chars at positions 7-8)
- `    A[Start]` - 4 leading spaces are not tested, then "A" at position 5, "[" at position 6, "Start" at positions 7-11, "]" at position 12
- Assertions are ordered consecutively by their starting character position on the line

### Development Workflow

1.  **Modify:** Edit the appropriate `.yaml` file in `syntaxes/diagrams/`.
2.  **Compile:** Run `npm run convertYaml`.
3.  **Verify:** Run `npm test` or a specific test file.
4.  **Debug:** If a test fails, check the scope names in the test file against the grammar definition.

### Directory Structure

- `syntaxes/`: **Edit here.** Source YAML grammar files.
- `out/`: **Do not edit.** Generated JSON grammar files.
- `tests/`: Test files with scope assertions.
- `build/`: Build scripts (e.g., `ConvertYaml.mjs`).

## 3. Cursor/Copilot Rules

_No specific `.cursor/rules` or `.github/copilot-instructions.md` were found in the repository._

## 4. Deployment Commit Workflow

When asked to create a deployment or release commit, follow these steps:

1.  **Update Version:**

    - Take the provided version number.
    - Update the `version` field in `package.json`.

2.  **Update Changelog:**

    - Add a new H2 header at the top of `CHANGELOG.md` following the existing format (e.g., `## [v1.2.3]`).
    - Below the header, add a very brief bulleted list of the changes from the current branch or prompt.

3.  **Create Commit:**
    - Create a commit including `package.json` and `CHANGELOG.md`.
    - Use the commit message format: `chore: bump version to <version number> for <very brief change>`

## 5. Agent Definitions

### Researcher

- **Role:** Analyzes syntax requirements and maps them to TextMate scopes.
- **Workflow:**
  1.  Uses input text and syntax documentation from [mermaid.js.org](https://mermaid.js.org/) to understand the diagram syntax.
  2.  Identifies necessary syntax changes or additions.
  3.  Reviews the existing codebase (`syntaxes/` directory) and general TextMate naming conventions.
  4.  Determines the appropriate TextMate scopes for each syntax token.
  5.  **When uncertain about scope selection:** Ask the user for clarification. Provide:
      - The specific word/character in question
      - Example text/context showing where it appears
      - A brief explanation of why the scope is uncertain
      - Recommended scope(s) based on existing patterns

### Testing Agent

- **Role:** Creates and updates test cases to validate syntax highlighting.
- **Workflow:**
  1.  Modifies files in the `tests/` directory.
  2.  Applies the scopes determined by the Researcher.
  3.  Follows the repository's testing conventions (using `<-----` and `^^^^` markers) to create clear validation lines for the expected changes.
  4.  **IMPORTANT:** Every non-commented line in the test file must have corresponding scope assertions below it. Every non-whitespace character on the test line must have a corresponding scope validation line below it. Assertions should not cover whitespace characters.

### Implementer

- **Role:** Applies the syntax changes to the grammar files.
- **Workflow:**
  1.  Modifies the actual syntax definitions in `syntaxes/diagrams/*.yaml`.
  2.  Implements the regex patterns and scope mappings defined by the Researcher.
  3.  Ensures the YAML is valid and follows the `!regex` custom tag conventions described in the "Code Style & Conventions" section.
