# Unit tests - reference guide

Unit tests in **PromptWatch** follow `code-first` principle. This means, that you don't need to do any action in the UI in order to define and run the test cases. Unit test will be created on it's first run.

## Advanced scenarios

### Source of test cases

Currently there are 4 supported sources of test cases:

- Annotated LLM prompt executions
- Annotated top level chain executions
- Test cases provided in a json file
- Test cases loaded in runtime

This is how you define the source of test cases in code

```python
# for source of data defined by annotated LLM runs using a registered template
with UnitTest("the_name_of_the_test").for_prompt_template("the_name_of_the_template") as test:
                                     .for_project_sessions("tracking_project") as test:
                                     .for_test_cases([*items]) as test:
                                     .for_test_cases_in_file("path/to/file.json") as test:
```

### Unit test over code when there is not a single root chain

Sometimes you may deicide to build the interaction with user as a set of chains, not bound in `SequenceChain` or some single root `Chain`, but rather pass output from one chain into another manually.

Example:
```python
...

def handle_user_input(self, input_str):
    first_sub_result = self.first_chain({"input":input_str})
    
    input_for_second_chain = self.do_magic(first_sub_result)
    
    output = self.second_chain(input_for_second_chain)
    return output

```

this will lead to having two separate root chains for single user interaction in the session trace. If we would annotate both, we will receive them as two separate examples, since there is no way of knowing for PromptWatch that these two chain executions are bound together by `do_magic`.

In this case we can use trick to skip a test_case example during the test:

```python
with UnitTest("the_name_of_the_test").for_prompt_template("the_name_of_the_template") as test:
    # iterate over the test cases
    for test_case in test.test_cases():
        # take the inputs from first test case and passing them into our custom function
        # highlight-next-line
        result = self.handle_user_input(test_case.inputs)
        #skip n steps
        # highlight-next-line
        test_case.skip()
        # and evaluate the final result against the last chain output in the sequence
        # highlight-next-line
        test_case.evaluate_result(result)
```

Note that if the number of intermediary step is not static, it can be challenging to know which step to skip.

You can still examine input and output of each step to help you determine how many steps should be skipped

:::note
For each test_case it is expected that you fill call wither 

- `evaluate` (expects a function or callable object... will pass the inputs as kwargs) 
- `evaluate_result` expects only the outputs from whatever code you 'll execute

If you do not run one of these, and neither you'll execute `skip()`, an exception will be raised, since by default evaluation for each test case is expected.
:::

### LangChain test memory

If you chain contains memory, the inputs keys from memory will overwrite the inputs provided from the outside and some of the memory types would also accumulate conversations from previous tests, not to mention that using production memory could lead to saving test conversations which is also likely not desirable.

Because of this, we need to use unit testing memory that would assure that for each test case we would push the right input data into our chain.

Here is how it works:

```python
my_chain = create_chain()

with UnitTest("my_test").for_project_sessions("my_project") as test:
        # we need to replace the memory if you use one, to reset it after each test
        # highlight-next-line
        my_chain.memory = test.langchain.get_test_memory(
                # we also need to preserve the same memory key
                # highlight-next-line
                memory_key=llmChain.memory.memory_key 
            ) 
        test.evaluate(my_chain)
        
```


### Async Unit test execution

Asynchronous unit test execution is not currently supported.


### Implementing custom evaluator

If you want to implement your custom evaluation, you just need to implement this abstract class

```python
class EvaluationStrategyBase(ABC):
    
    @property
    @abstractmethod
    def evaluation_method(self)->str:
        pass

    @abstractmethod
    def evaluate(self, generated_result:str, test_case:"TestCase")->"TestCaseResult":
        pass
```

`evaluation_method` is a property that should return a unique name for your evaluation methid

and `evaluate` is a method that need to return `TestCaseResult`.

then you can assign this  evaluator as a parameter into `UnitTest`:

```python
# highlight-next-line
with UnitTest("the_name_of_the_test",evaluation=MyEvaluationStrategy()).for_prompt_template("the_name_of_the_template") as test:
    for test_case in test.test_cases():
        test_case.evaluate(llmChain.run)

```
