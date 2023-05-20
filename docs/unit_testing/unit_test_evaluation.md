# Unit test evaluation
By default, we use **cosine similarity** metric to determine how similar the generated result is to the annotated reference example. The main goal here is ** not to determine** whether the generated result is good or bad, but like identify the scenarios where our change introduced changes above specified threshold.

The evaluation here was implemented with intent to identify cases where we unintented consequences and basicaly breaking up scenarios which were already running. 

There are however many possible ways how to measure the performance of your chains and pipelines. If basic evaluation methods described here doesn't fit you, you are free to implement your own evaluator. [Here is how](/docs/unit_testing/unit_tests_reference_guide#implementing-custom-evaluator)

## Defining the embedding provider
By default - OpenAI embeddings are used, bud you can change it by setting the embedding function:
 
```python
from promptwatch.unit_tests import UnitTest
from promptwatch.unit_tests.evaluation import CosineScoreEvaluationStrategy
from langchain.embeddings import CohereEmbeddings

my_chain=create_chain()
cohere = CohereEmbeddings(
    model="embed-english-light-v2.0", cohere_api_key="my-api-key"
)
evaluator_with_cohere = CosineScoreEvaluationStrategy(embed_function=cohere)
with UnitTest("test_session", evaluator=evaluator_with_cohere).for_project_sessions("demoChatGPT") as test:
    for test_case in test.test_cases():
        test_case.evaluate(my_chain)

```

### How is determined whether the test passed/failed

Each test case can have one or more expected outputs... Each expected output can be for positive (liked 👍) or negative (disliked 👎). 

Each test case is compared to the desired output, and cosine similarity / distance is calculated

- for positive (liked 👍) example, we want the generated result to be as close to the reference one. Therefore the score is cosine similarity. 
- for negative (disliked 👎) example, we want the generated result to "be as far from the example"[^1] as possible, there fore cosine distance is used

[^1] - this is not necessarily true, but for the scoring purposes let's assume that it is. See the note below

If more expected outputs are present, the one with best score (closest similarity or )

:::note

This choice was done because we generally want the score have in range 0-1 and "the more the better". However combining cosine distance with cosine similarity is tricky.

If we have for each test case at least one positive example, it should be fine since if the generated output is closer to the positive example than to the negative, the score of positive example will be used.

Only if the result will be closer to the negative example, the relatively much smaller score of cosine distance (usually in range 0-0.3) will be used, amplifying the fact that the result was generated close to the unwanted result.
:::






#### Customize the thresholds

just define threshold for positive/negative example

```python
from promptwatch.unit_tests import UnitTest
from promptwatch.unit_tests.evaluation import CosineScoreEvaluationStrategy

my_chain=create_chain()
evaluator_with_cohere = CosineScoreEvaluationStrategy(
        positive_score_threshold=0.7, 
        negative_score_threshold=0.3
    )
with UnitTest("test_session", evaluator=evaluator).for_project_sessions("demoChatGPT") as test:
    for test_case in test.test_cases():
        test_case.evaluate(my_chain)
```



