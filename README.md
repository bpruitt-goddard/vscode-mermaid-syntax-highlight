# vscode-mermaid-syntax-highlight
Markdown syntax support for the [Mermaid charting language](https://github.com/knsv/mermaid)

## Screenshots/Progress

### Graph
<img src="/images/graph.png" alt="Graph Screenshot" width="500">

```mermaid
graph TB %% tab completion: 'graph'
  ID-1[Node 1] %% tab completion: 'node'
  ID-2>Node 2]
  ID-3(Node 3)
  ID-1---ID-2 %% tab completion: 'link'
  ID-1 --> ID-3
  ID-2--Link between 2 and 3---ID-3
  ID-3-->|Action from 3 to 1|ID-1
  ID-3 -- "Action from 3 to 2. p/w: '_-!#$%^&*+=?,\'" --> ID-2
  %% tab completion: 'class'
  classDef blue fill:#08f,stroke:#fff
  class ID-1 blue
  %% tab completion: 'click'
  click ID-1 "https://github.com" "Tooltip text"
  click ID-2 alert "Tooltip for a callback"
  subgraph A subgraph
    ID-4{Node 4}
    ID-5((fa:fa-spinner))
    ID-6["Node 6 (same #quot;shape#quot;)"]
    ID-4-.->ID-5
    ID-5 -. Action from 5 to 4 .-> ID-4
    ID-5==>ID-6
    ID-6 == Action from 6 to 5 ==> ID-5
  end %% tab completion: 'subgraph'
```

#### Progress

- [x] Keywords
- [x] %% Comments
- [x] Entity---Entity (livne )
- [x] Entity---Text---Entity
- [x] Entity-->|Text|Entity
- [ ] Entity-->|Special Chars|Entity
- [x] Entity[Text]
- [ ] classDef
- [ ] class
- [ ] click 

## Initial Idea

Based on the starter language support repo [here](https://github.com/mjbvz/vscode-fenced-code-block-grammar-injection-example), and initially created based on the Atom language support [here](https://github.com/ytisf/language-mermaid).

## TODO

- [ ] Publish to VS Marketplace
- [ ] Determine remaining missing syntax issues
- [ ] Add sequenceDiagram support