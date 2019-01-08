# vscode-mermaid-syntax-highlight
Markdown syntax support for the [Mermaid charting language](https://github.com/knsv/mermaid)

## Screenshots/Progress

### Graph
<img src="https://raw.githubusercontent.com/bpruitt-goddard/vscode-mermaid-syntax-highlight/master/images/graph.png" alt="Graph Screenshot" width="500">

```mermaid
graph TB %% comments
  %% Entity[Text]
  ID-1[Node 1]
  ID-2>Node 2]
  ID-3(Node 3)
  %% Entity--Entity
  ID-1---ID-2
  ID-1 --> ID-3
  %% Entity--Text--Entity
  ID-2--Link between 2 and 3---ID-3
  ID-3-->|Action from 3 to 1|ID-1
  ID-3 -- "Action from 3 to 2. p/w: '_-!#$%^&*+=?,\'" --> ID-2
  %% class/classDef
  classDef blue fill:#08f,stroke:#fff;
  class ID-1 blue
  class ID-1,ID-2 red
  %% click
  click ID-1 "https://github.com" "Tooltip text" %% comments
  click ID-2 alert "Tooltip for a callback"
  %% subgraph
  subgraph A subgraph
    ID-4{Node 4}
    ID-5((fa:fa-spinner))
    ID-6["Node 6 (same #quot;shape#quot;)"]
    ID-4-.->ID-5
    ID-5 -. Action from 5 to 4 .-> ID-4
    ID-5==>ID-6
    ID-6 == Action from 6 to 5 ==> ID-5
  end
```

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

```mermaid
sequenceDiagram %% diagram
  %% participant
  participant Alice
  participant B as Bob
  participant C as Carol
  %% arrows
  B->C: Solid line without arrow
  B-->C: Dotted line without arrow
  B->>C:Solid line with arrowhead
  B-->>C: Dotted line with arrowhead
  B-xC: Solid line with a cross at end
  B--xC: Dotted line with a cross at end
  %% activations
  activate John
  deactivate John
  %% activation shorthand
  Bob->>+Carol: Hello Carol, how are you?
  B-->>-C: Great!
  %% notes
  Note left of Alice: Alice likes to chat
  Note over B,C: Bob whispers when sick
  %% loop
  loop Every minute
        B-->C: Can you hear me?
  end
  %% alt
  alt is sick
    B-->C: Not so good :(
  else is well
    B->C: Feeling fresh like a daisy
  end
  opt Extra response
    B->C: You, Carol?
  end
```

- [ ] Keywords
- [x] %% Comments
- [x] participant Actor
- [x] participant Aliases
- [x] Actor->>Actor: Message
- [x] 6 arrow types
- [x] (de)activate Actor
- [x] activate/deactivate shorthand (+/-)
- [x] Note Action Actor
- [x] Multi-actor notes
- [ ] loop
- [ ] alt
- [ ] alt optional

### Gantt
TODO
## Initial Idea

Based on the starter language support repo [here](https://github.com/mjbvz/vscode-fenced-code-block-grammar-injection-example), and initially created based on the Atom language support [here](https://github.com/ytisf/language-mermaid).

## TODO

- [ ] Publish to VS Marketplace
- [ ] Determine remaining missing syntax issues
