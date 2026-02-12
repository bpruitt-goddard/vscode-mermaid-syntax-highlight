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
- **Defining Scopes:** There are two ways to identify the expected scope for a token:
  1. **Arrow (`<-----`):** Used when the text to check is at the very beginning of the line. The number of dashes corresponds to the number of characters from the start of the line to check.
     ```mermaid
     graph TB
     %% <----- keyword.control.mermaid
     ```
  2. **Caret (`^^^^`):** Used to check specific spans of text. The carets must align vertically with the characters on the line above.
     ```mermaid
     ID-1
     %%^^^^ variable
     ```

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
