# deno-prompt

A command line interaction utils like [inquirer](https://www.npmjs.com/package/inquirer).

## params

|    filed     |   type   | required | description                                        |            default            |
| :----------: | :------: | :------: | -------------------------------------------------- | :---------------------------: |
|     type     |  string  |    Y     | Type that will use different components.           |                               |
|     name     |  string  |    Y     | Field name in response object.                     |                               |
|   message    |  string  |    N     | Toast message before user input.                   | First letter upper of `name`. |
| defaultValue |   any    |    N     | Default value.                                     |          `undefined`          |
|   validate   | Function |    N     | Validate user input. Throw `PromptError` if deny.  | Function that returns `void`. |
|     when     | Function |    N     | Returns true or Promise<true> to show this prompt. | Function that returns `true`. |

## builtin types

- `text` Read user input.
- `number` Read user input which must be a number. Extra params like this:

| filed |  type  | required | description | default |
| :---: | :----: | :------: | ----------- | :-----: |
|  min  | number |    N     | Min number. |         |
|  max  | number |    N     | Max number. |         |

- `confirm` Read user input and returns as boolean. Extra params like this:

| filed |  type  | required | description | default |
| :---: | :----: | :------: | ----------- | :-----: |
|  yes  | string |    N     | Yes string. |         |
|  no   | string |    N     | No string.  |         |

## basic usages

```typescript
import Prompt from "https://deno.land/x/prompt";

const answers = await Prompt.prompts([
  { type: "text", name: "name", message: "Please input your name: " },
  {
    type: "text",
    name: "sex",
    message: "Please input your sex(male or female): ",
    validate(result: string) {
      if (!["male", "female"].includes(result)) {
        throw new PromptError("input must be [male] or [female]");
      }
    },
  },
  { type: "number", name: "birthYear", min: 1900 },
  { type: "number", name: "age", min: 1, max: 100 },
  { type: "confirm", name: "agree", defaultValue: true },
]);

console.log(answers);
```

## custom usages

It supported to define custom component. Here is am example.

- Define component which must has static function called `run` and accept `args` which extends `PromptParams`.

```typescript
import Prompt from "https://deno.land/x/prompt";

class CustomComponent {
  static async run<T extends PromptParams>(args: T) {
    // Your define code to do something.
  }
}

Prompt.registerComponent("custom", CustomComponent);
```

- Usage.(You must put bellow code after define component)

```typescript
import Prompt from "https://deno.land/x/prompt";

const answers = await Prompt.prompts([
  { type: "custom", name: "name", message: "Please input your name: " },
]);

console.log(answers);
```
