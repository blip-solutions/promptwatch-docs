# Track costs per tenant

You can separate all OpenAI costs as well as other metrics by setting up `tracking_tenant` parameter

## How to define tracking_tenant

All you need is to define `tracking_tenant` attribute when creating PromptWatch context. It is expected that you'll assign this attribute dynamically at runtime. The concrete solution is based on your authentication.

```python
from promptwatch import PromptWatch

my_chain = build_chain()

tenant_id = get_tenant()
# highlight-next-line
with PromptWatch(tracking_tenant=tenant_id) as pw:
    my_chain("The quick brown fox jumped over")
```

Now all the sessions can be filtered based on the tenant and also all the metrics can be separated by this attribute (costs, number of errors etc.).

:::note
`tracking_tenant` has to be max 256 char long and without white-spaces
:::

## Pulling metrics for tenant:
... coming soon