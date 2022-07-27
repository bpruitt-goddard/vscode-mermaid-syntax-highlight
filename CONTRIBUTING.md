## Building

The grammars for each diagram type reside in `syntaxes/diagrams` in separate files.

To test changes locally:
1. Build the theme and create the vsix package by running:
```sh
npm install
vsce package
```
2. Install the theme locally by using the `Install from VSIX` command. This may require reloading VS Code to see the changes.

## Testing
There are tests validating the grammar that can be triggered by running:

```sh
npm test
```

The tests will validate the grammar for all diagrams. Note this does _not_ build the grammar, this will need to be done if changes have been made to the `yaml`. To test and build, run:

```sh
npm run convertYaml && npm test  
```

## Developing

The grammar includes a custom yaml type `regex`. This should be used for all but the simplest regex expressions. It was created to allow the regex to be multiline (with no whitespace between lines) and in-line comments that are stripped from the json. To use it, prepend `!regex` as seen below:

```yaml
reg: !regex |-
  # Comment
  \s*(class)\s+ # explanation
  (\b[-,\w]+)\s+ # comment
```

Becomes:

```json
{
  "reg": "\\s*(class)\\s+(\\b[-,\\w]+)\\s+"
}
```

Instead of:

```json
{
  "reg": "# Comment\n\\s*(class)\\s+ # explanation\n(\\b[-,\\w]+)\\s+ # comment"
}
```

This is useful for splitting out sections of the regex (such as capture groups) and commenting on what each group should be matching.
