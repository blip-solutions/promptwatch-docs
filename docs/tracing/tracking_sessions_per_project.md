# Tracking sessions and statistics per project

Usually you want to be able to separate your metrics and sessions for different dev projects as well as per deployments.
PromptWatch allows you to define a `tracking_project` at the code level, in order to distinguish between different code bases as well as different environments (typically DEV vs PROD).

## How to define your tracking_project

All you need is to define `tracking_project` attribute when creating PromptWatch context.

```python
from promptwatch import PromptWatch

my_chain = build_chain()
# highlight-next-line
with PromptWatch(tracking_project="define_your_project_id") as pw:
    my_chain("The quick brown fox jumped over")
```

Or you can simply define it as an **ENV variable** `PROMPTWATCH_TRACKING_PROJECT`

Now all the sessions can be filtered based on the Tracking project and also all the metrics can be separated by this attribute (costs, number of errors etc.).

:::note
`tracking_project` has to be max 256 char long and without white-spaces
:::