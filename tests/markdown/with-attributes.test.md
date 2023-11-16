%% SYNTAX TEST "markdown.mermaid.codeblock" "with attributes markdown test"

```{ .mermaid caption="test" #fig:graph}
graph LR
%% <----- keyword.control.mermaid
%%    ^^ entity.name.function.mermaid
  A --> B
%%^ variable
%%  ^^^ keyword.control.mermaid 
%%      ^ variable
```