---
sidebar_position: 0
---

# Introduction
With PromptWatch.io, you can:

-   With PromptWatch.io, you can track all chains, actions, retrieved documents, and more
-   Monitor LLM prompts and even replay LLM runs with the same input parameters and model settings to optimize your prompt templates.
-   Keep track of your **costs** **by project** and  **by tenant** as well as track the most **expensive prompt templates**
-   Unit test your chains based on annotated reference prompt executions and sessions



## Comprehensive Chain Execution Tracking

With PromptWatch.io, you can track all chains, actions, retrieved documents, and more to gain complete visibility into your system. This makes it easy to identify issues with your prompts and quickly fix them for optimal performance.

What sets PromptWatch.io apart is its intuitive and visual interface. You can easily drill down into the chains to find the root cause of any problems and get a clear understanding of what's happening in your system.

![](/assets/images/sessions_optimized.gif)

Read more here:
[Chain tracing documentation](/docs/category/chain-tracing)

## LLM Prompt caching
It is often tha case that some of the prompts are repeated over an over. It is costly and slow. 
With PromptWatch you just wrap your LLM model into our CachedLLM interface and it will automatically reuse previously generated values.

Read more here:
[Prompt caching documentation](/docs/caching)

## LLM Prompt Template Tweaking

Tweaking prompt templates to find the optimal variation can be a time-consuming and challenging process, especially when dealing with multi-stage LLM chains. Fortunately, PromptWatch.io can help simplify the process!

With PromptWatch.io, you can easily experiment with different prompt variants by replaying any given LLM chain with the exact same inputs used in real scenarios. This allows you to fine-tune your prompts until you find the variation that works best for your needs.

![](/assets/images/prompt_templates_optmized.gif)

Read more here:
[Prompt tweaking documentation](/docs/prompt_tweaking)


## Keep Track of Your Prompt Template Changes

Making changes to your prompt templates can be a delicate process, and it's not always easy to know what impact those changes will have on your system. Version control platforms like GIT are great for tracking code changes, but they're not always the best solution for tracking prompt changes.

![](/assets/images/prompt_templates_optmized.gif)

Read more here:
[Prompt template versioning documentation](/docs/prompt_template_versioning)



## Unit testing
Unit tests will help you understand what impact your changes in Prompt templates and your code can have on representative sessions examples.

![](/assets/images/unit_tests.png)
Read more here:
[Unit tests documentation](/docs/category/unit-testing)