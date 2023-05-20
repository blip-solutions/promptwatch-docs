---
sidebar_position: 2
---

# Chain tracing
With PromptWatch.io, you can:

-   With PromptWatch.io, you can track all chains, actions, retrieved documents, and more
-   Monitor LLM prompts and even replay LLM runs with the same input parameters and model settings to optimize your prompt templates.
-   Keep track of your **costs** **by project** and  **by tenant** as well as track the most **expensive prompt templates**



## Comprehensive Chain Execution Tracking




With PromptWatch.io, you can track all chains, actions, retrieved documents, and more to gain complete visibility into your system. This makes it easy to identify issues with your prompts and quickly fix them for optimal performance.

What sets PromptWatch.io apart is its intuitive and visual interface. You can easily drill down into the chains to find the root cause of any problems and get a clear understanding of what's happening in your system.

![](/assets/images/sessions_optimized.gif)

### What is being tracked

PromptWatch tracks all the details that LangChain exposes via its tracking "API" and more.

👉 Chain execution inputs, outputs, execution time

👉 Tools input output

👉 retrieved documents from retrieval vector DB

👉 Details about LLM runs like:

-   final prompt text
-   generated text
-   execution details like model, temperature, etc. (everything you need to re-run the prompt with the same exact setup)
-   total used tokens
-   **costs (based on OpenAI price list per model)**
-   **prompt template and its parameters**

