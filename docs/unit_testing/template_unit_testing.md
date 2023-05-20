---
sidebar_position: 0
---

# Prompt template unit tests
#### Unit tests to test effects of recent changes in your template
This type of unit test is used to *evaluate* the the effect of recent *changes* in your *prompt template*, ( + model and it's parameters ) in isolation. It re-runs annotated prompt runs without running any other prompts in the chain. This is useful not only to lower the costs of such testing (not-needing to run other prompts in the chain), but also it helps to eliminate other effects on the test.

## How to setup your Prompt template tests


### 1. register your prompt template 
You need to register the template you wish to evaluate (see how to do it [here](/docs/prompt_template_versioning#how-to-register-a-template)). This will help us to identify the concrete template, regardless of the template and parameter changes.

### 2. run some experiments with your registered template
We need track some real and representative examples that will be used for reference. Just use your app and to generate some examples, or leave tracing on in prod. and let your customers generate you some data.
If you didn't setup tracing yet, please see our [quickstart](/docs/quickstart) tutorial.

### 3. annotate the generated results
Once we have some examples tracked, we can explore them in the detail of prompt template version. 

![](/assets/images/LLM_playground_optimized.gif)

Alternatively, you can do the same by identifying the executions in Sessions.

Annotate the good and bad examples by 👍👎. These examples will be used as a reference (similar to defining `assert val=="desired value"` or `assert val!="unwanted value"` in traditional programming). The difference is that we wont be using exact value equality here. See [unit test evaluation](/docs/unit_testing/unit_test_evaluation) for more detail

### 4. setup your test and run it  

```python
from langchain import PromptTemplate, LLMChain
from langchain.llms import OpenAI
from promptwatch import register_prompt_template
# highlight-next-line
from promptwatch.unit_tests import UnitTest

def build_your_chain():
    """ 
    THIS IS JUST AN EXAMPLE 
    Ideally you'd use the same function to create your chain as you are using in production 
    """
    
    TEST_TEMPLATE_NAME = "You are a joke teller. You write very short jokes about {topic} topic. You should write the joke as a reply to {sentence}, so it should be relevant:"

    # we need to ensure that our template is registered !
    # highlight-next-line
    registered_prompt_template = register_prompt_template("the_name_of_the_template", PromptTemplate.from_template(TEST_TEMPLATE_NAME))
    llm = OpenAI(temperature=0.0)
    
    llmChain = LLMChain(llm=llm, prompt=registered_prompt_template)
    return llmChain


llmChain = build_your_chain()

# now we create a unit test context specifying the name of the test an the source of test cases (for_prompt_template in our case)
# highlight-next-line
with UnitTest("the_name_of_the_test").for_prompt_template("the_name_of_the_template") as test:
    # iterate over the test cases
    # highlight-next-line
    for test_case in test.test_cases():
        # evaluate the method
        # highlight-next-line
        test_case.evaluate(llmChain.run)

```

This is a simple example how setup you unit test. As you can see, it takes just **3 lines of code** to define you unit test ✌️

For more advanced scenarios please see [Unit test reference guide](/docs/unit_testing/unit_tests_reference_guide)

