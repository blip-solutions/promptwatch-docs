---
sidebar_position: 15
---

# Async tracking and streaming

:::note
Since LangChain version 0.0.155, there have been some changes, and this special treatment for async is no longer necessary... all you need to do is wrap your chain calls in PromptWatch context. 

Thus **this document is not longer relevant**

However, in async mode, there are some limitations where we can't capture all the data that we track in sync mode. This can be overcome by registering the prompt template.
:::

## Introduction

Async tracing is generally useful when you want to save time waiting for the trainer, but let's be honest, compared to the LLMs execution time, it is very likely insignificant. 

Where it is necessary though is if you want to stream tokens as they become available (continuously write response, like in ChatGPT)

## How to do async tracing

In general, if you want to use asynchronous tracing, you need to use `AsyncCallbackManager`, which comes with LangChain but is not the default callback manager. Therefore, we need to assign it manually to all the chains.

```python
from langchain.callbacks.base import AsyncCallbackManager
from langchain.llms import OpenAI

template = """Assistant is a large language model trained by OpenAI.

Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.

{history}
Human: {human_input}
Assistant:"""


prompt_template = PromptTemplate(
    input_variables=["history", "human_input"], 
    template=template
)

# create instance of AsyncCallbackManager
# highlight-next-line
async_manager=AsyncCallbackManager()

#and set it to OpenAI LLM
streaming_llm = OpenAI(
    # highlight-next-line
    streaming=True,
    # highlight-next-line
    callback_manager=async_manager,
    temperature=0,
)

# as well as into the chain it self
answer_chain = LLMChain(
        llm=streaming_llm, 
        prompt=prompt_template, 
        # highlight-next-line
        callback_manager=async_manager
    )

answer_chain.run("my question")

```

## How to integrate PromptWatch with async handler

However, there are two important caveats to this approach, that causes that the most easiest way of integrate PromptWatch doesn't work here.

1. since we swapped the default callback manager, we need to assign callback handlers for tracing manually
2. we are leveraging `inspect` module to get to some information about the state of LLM that is not available through standard LangChain API... this however approach  doesn't work with async function. This can be overcome though if you register your prompt. That way we can do some monkeypatching and wrap the functions we need to deliver full potential. This step is optional. If you don't need the LLM playground functionality of PromptWatch here, you don't need to register your template.




```python
# create PromptWatch instance
pw = PromptWatch(tracking_project="chat") 

async_manager=AsyncCallbackManager()
# 1. get promptwatch get_langchain_callback_handler and add it to async manager
async_manager.add_handler(pw.get_langchain_callback_handler())

# 2. highlight-next-line
pw.register_prompt_template("assistant_template", prompt_template)
```




so the final code would look like this:

```python
from langchain.callbacks.base import AsyncCallbackManager
from langchain.llms import OpenAI
# highlight-next-line
from promptwatch import PromptWatch

template = """Assistant is a large language model trained by OpenAI.

Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.

{history}
Human: {human_input}
Assistant:"""


prompt_template = PromptTemplate(
    input_variables=["history", "human_input"], 
    template=template
)

# create instance of AsyncCallbackManager
# highlight-next-line
pw = PromptWatch() 

async_manager=AsyncCallbackManager()
# 1. get promptwatch get_langchain_callback_handler and add it to async manager
# highlight-next-line
async_manager.add_handler(pw.get_langchain_callback_handler())

# 2. highlight-next-line
pw.register_prompt_template("assistant_template", prompt_template)

#and set it to OpenAI LLM
streaming_llm = OpenAI(
    streaming=True,
    callback_manager=async_manager,
    verbose=True,
    temperature=0,
)

# as well as into the chain it self
answer_chain = LLMChain(
        llm=streaming_llm, 
        prompt=prompt_template, 
        callback_manager=async_manager
    )

```


<!-- 
## Full example with streaming using FastAPI and websockets

### Prepare the chain

```python
from langchain.callbacks.base import AsyncCallbackManager
from langchain.llms import OpenAI
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

#init vector DB
loader = TextLoader('state_of_the_union.txt')
documents = loader.load()
embeddings = OpenAIEmbeddings()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
texts = text_splitter.split_documents(documents)
vectordb = Chroma.from_documents(texts, embeddings)




def get_chain( stream_handler, promptwatch_handler):
    """Create a ChatVectorDBChain for question/answering."""
    

    # we need two separata managers... one is for the internal chains (let's assume we don't want to stream the internal thoughts to client )
    manager = AsyncCallbackManager([promptwatch_handler])

    # and another manager that has 
    # - stream_handler: takes care of streaming via websockets
    # - promptwatch_handler: takes care of tracing the execution and sending the logs to PromptWatch
    stream_manager = AsyncCallbackManager([stream_handler, promptwatch_handler])


    # we don't need to stream the internal thoughts
    llm = OpenAI(
        temperature=0,
        verbose=True,
        callback_manager=question_manager,
    )
    # this llm is for the final answer generation
    streaming_llm = OpenAI(
        streaming=True,
        callback_manager=stream_manager,
        verbose=True,
        temperature=0,
    )

    question_generator = LLMChain(
        llm=question_gen_llm, prompt=CONDENSE_QUESTION_PROMPT, callback_manager=manager
    )
    doc_chain = load_qa_chain(
        streaming_llm, chain_type="stuff", prompt=QA_PROMPT, callback_manager=manager
    )
    pw.register_prompt_template("condense_question", CONDENSE_QUESTION_PROMPT)
    pw.register_prompt_template("qa_prompt", QA_PROMPT)
    
    qa = ConversationalRetrievalChain(
        retriever=vectordb.as_retriever(),
        combine_docs_chain=doc_chain,
        question_generator=question_generator,
        callback_manager=manager,
    )
    return qa


``` -->
<!-- 
### Integrate web with websockets and FastAPI
```python 

class StreamingLLMCallbackHandler(AsyncCallbackHandler):
    """Callback handler for streaming LLM responses via websockets"""

    def __init__(self, websocket):
        self.websocket = websocket

    async def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        resp = {"sender":"bot", "message": token, "type":"stream"}
        await self.websocket.send_json(resp.dict())


@app.websocket("/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    chat_history = []

    pw = PromptWatch() 

    stream_handler = StreamingLLMCallbackHandler(websocket)
    promptwatch_handler = pw.get_langchain_callback_handler()

    qa_chain = get_chain( stream_handler, pw)
    with pw:
        while True:
        
                try:
                    qa_chain.combine_docs_chain
                    
                    # Receive and send back the client message
                    question = await websocket.receive_text()
                    resp = {"sender":"you", "message":question, "type":"stream"}
                    await websocket.send_json(resp.dict())


                    result = await qa_chain.acall(
                        {"question": question, "chat_history": chat_history}
                    )
                    chat_history.append((question, result["answer"]))

                    
                    resp = {"sender":"bot", "message": result["answer"], "type":"end"}
                    await websocket.send_json(end_resp.dict())
                except WebSocketDisconnect:
                    logging.info("websocket disconnect")
                    break
                except Exception as e:
                    logging.error(e)
                    print(e)
                    resp = ChatResponse(
                        sender="bot",
                        message="Sorry, something went wrong. Try again.",
                        type="error",
                    )
                    await websocket.send_json(resp.dict())

``` -->