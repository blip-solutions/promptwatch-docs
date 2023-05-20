---
sidebar_position: 4
id: caching
---

# LLM calls caching

Prompt caching allows you to save costs and speed up the LLM responses significantly for most common prompt/questions.


## Semantical caching

PromptWatch uses semantical caching which means that the prompt is compared to the previous prompts by semantical (cosine) similarity. If the prompt matches previously generated prompt by predefined similarity (by default >0.97 ... which can be interpreted as over 97% similar), the response will be reused.

## Caching options

When using cache you have these configuration options available:

- `cache_namespace_key: Optional[str]` - cache partition key - to create separate cache storage for this LLM... to ensure that the cached responses wont be mixed up from different LLMs/Chains
  
- `cache_embeddings: Optional[Embeddings]` - langchain embeddding object for semantic search... if None, openAIs ada-002 model will be used

- `token_limit:int=None` - token encoding window for the model used in embeddings... if the prompt goes above this window, the cache won't be used to ensure accurate prediction

- `similarity_limit:float=0.97` - minimum required similarity (cosine similarity = 1-distance)

## Usage 

### For completion LLMs
```python
# highlight-next-line
from promptwatch.langchain import CachedLLM
llm =  OpenAI(temperature=0)
# highlight-next-line
cached_llm = CachedLLM(chat)

# now you can add  your LLM into chain as you would the original
```


### For chat LLMs
```python
# highlight-next-line
from promptwatch.langchain import CachedChatLLM
chat_llm = ChatOpenAI(temperature=0)
# highlight-next-line
cached_chat_llm = CachedChatLLM(chat)

# now you can add  your LLM into chain as you would the original
```

###  How and When to use caching

In general it is not great idea to use cached LLM for the whole chain. The semantical similarity can be tricky... since two prompts that are very similar could still have different response required.

For example

`What is the distance from earth sun ?`

`What is the distance from earth moon ?`

Are very similar (cosine similarity `0.99`) but the answer is quite different. 

Ideal use-cases for LLM caching are a subchains that produces larger amount of text and will have another LLMChain processing these data. Good example a setup with Critic (the LLM criticism for one scenario can be relevant for another scenario but there is still another LLMChain following after cache that has chance to correct potential problems). 