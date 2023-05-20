---
sidebar_position: 1
---

# Quickstart

Installation
```
pip install promptwatch
```

## Basic usage

In order to enable session tracking wrap you chain executions in PromptWatch block

Minimalistic example

```python
from langchain import OpenAI, LLMChain, PromptTemplate
from promptwatch import PromptWatch

prompt_template = PromptTemplate.from_template("Finish this sentence {input}")
my_chain = LLMChain(llm=OpenAI(), prompt=prompt_template)

with PromptWatch(api_key="<your-api-key>") as pw:
    my_chain("The quick brown fox jumped over")
```

:::note
The example above doesn't cover setup for async execution. If you are using streaming, please check out ()[streaming tutorial]

:::
### Where to get your API key:

You can find all your api keys at Account settings (avatar icon at the bottom of the menu) / Api keys

![](/assets/images/api_keys.png)

