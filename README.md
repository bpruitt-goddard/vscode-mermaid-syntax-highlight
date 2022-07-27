# vscode-mermaid-syntax-highlight

Syntax support for the [Mermaid charting language](https://github.com/knsv/mermaid)

[![Version](https://vsmarketplacebadge.apphb.com/version/bpruitt-goddard.mermaid-markdown-syntax-highlighting.svg)](https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting) [![Installs](https://vsmarketplacebadge.apphb.com/installs/bpruitt-goddard.mermaid-markdown-syntax-highlighting.svg)](https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting) [![Ratings](https://vsmarketplacebadge.apphb.com/rating/bpruitt-goddard.mermaid-markdown-syntax-highlighting.svg)](https://marketplace.visualstudio.com/items?itemName=bpruitt-goddard.mermaid-markdown-syntax-highlighting)

Supports both fenced markdown (see screenshots), and mmd files.

## Screenshots/Progress

### Graph

<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/graph.png" alt="Graph Screenshot" width="500">

#### Progress

- [x] Keywords
- [x] %% Comments
- [x] Entity---Entity (livne )
- [x] Entity---Text---Entity
- [x] Entity-->|Text|Entity
- [x] Entity-->|Special Chars|Entity
- [x] Entity[Text]
- [x] classDef
- [x] class
- [x] click

### Sequence

<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/sequenceDiagram.png" alt="Sequence Diagram Screenshot" width="500">

#### Progress

- [x] Keywords
- [x] %% Comments
- [x] participant Actor
- [x] participant Aliases
- [x] Actor->>Actor: Message
- [x] 8 arrow types
- [x] (de)activate Actor
- [x] activate/deactivate shorthand (+/-)
- [x] Note Action Actor
- [x] Multi-actor notes
- [x] loop
- [x] alt
- [x] alt optional
- [x] rect
- [x] par
- [x] autonumber

### Gantt

<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/ganttDiagram.png" alt="Gantt Diagram Screenshot" width="500">

#### Progress 

- [x] Keywords
- [x] %% Comments
- [x] dateFormat
- [x] axisFormat
- [x] title
- [x] section
- [x] task

### Pie

<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/pieChart.png" alt="Pie Chart Screenshot" width="500">

#### Progress

- [x] Title
- [x] Data Sets

### Class Diagram

<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/classDiagram.png" alt="Class Diagram Screenshot" width="500">

#### Progress

- [x] %% Comments
- [x] Class
- [x] Class members
- [x] Class member visibility
- [x] Class members generics
- [x] Class relationships
- [x] Annotations

### State Diagram

<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/stateDiagram.png" alt="State Diagram Screenshot" width="500">

#### Progress

- [x] States with description
- [x] Transition with text
- [x] Composite states
- [x] Forks
- [x] Notes
- [x] Concurrency
- [x] Comments


### Entity Relationship Diagrams

<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/erDiagram.png" alt="Entity Relationship Diagram Screenshot" width="500">

#### Progress

- [x] Entities
- [x] Comments
- [x] Entity Attributes (and keys/comments)
- [x] Relationships (and labels)

### ADO Support

Supports highlighting in Azure Dev Ops (ADO) colon syntax:

<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/adoSyntax.png" alt="ADO Syntax Screenshot" width="150">

## Initial Idea

Based on the starter language support repo [here](https://github.com/mjbvz/vscode-fenced-code-block-grammar-injection-example), and initially created based on the Atom language support [here](https://github.com/ytisf/language-mermaid).


## Contributing

For information on how to build/test/contribute, see the [Contributing Guide](CONTRIBUTING.md).