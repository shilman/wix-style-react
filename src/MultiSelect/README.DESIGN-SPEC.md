As a discussion resulting from [this Issue](https://github.com/wix/wix-style-react/issues/2559)...

# New API (`onTagsAdded` prop)

When this prop is passed, the component will have a new callback API.

- The `onSelect` will behave differently.
- `onManuallyInput` will NOT be called.
- Paste logic will change

## Internal Actions

These are internal actions which can be performed by the user:

- Submit: Submits the current input value. Calls `onTagsAdded` (if non empty after triming)
- Select: Selects the marked option (if there is one)
- Cancel: Clears the input, and closes options.

### User Actions -> Internal Actions

| User Action                 | Input State   | Marked Option |Internal Action |
|-----------------------------|---------------|---------------|----------------|
| Click on option             |  *            | *             | Select         |
| Paste                       |  *            | *             | Submit         |
| COS, Esc, Blur              |  *            | *             | Cancel         |
| Enter, Delimiter, Tab       | non-empty     | exists        | Select         |
| Enter, Delimiter, Tab       | non-empty     | none          | Submit         |
| Enter, Tab                  | empty         | exists        | Select         |
| Tab                         | empty         | none          | Step Out       |

> COS : Click Out Side

## Props

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| onTagsAdded | function |  |  |  A callback which is called when the user performs a Submit action. Submit action triggers are: "Enter", "Tab", [typing any defined delimiter], Paste action. Callback receives a single argument `Array<string>` which is a result of splitting the value by the given `delimiters` prop (and trimming each part)|
| markFirstMatchingOption | boolean | false |  | When true then when typing, the first matching option will be "marked", so that pressing "Enter" will select it.|
| onSelect | function | | |`onSelect` will be called ONLY when a user clicks on an option from the options list. It receives an `Array<object>` of newly selected options (usually one). Each object is the original option, excluding the `value` property. (`value` property should be used for rendering the option only)|

### markFirstMatchingOption (new prop)

For example, when there is an `Alabama` option, and the input contains `Alab`, the options is showing the `Alabama` option.

- `markFirstMatchingOption === false` (default) : No option will be marked, "Enter" submits (calls `onTagsAdded`) the input value. (The user can navigate to the options)
- `markFirstMatchingOption === true` : The first matching option is marked (like hovered), "Enter" selects it.

> When `preferOption===true` then it is not possible to enter a new Tag which is a prefix of an existing option vlaue.

### onSelect (Changes)

Current `onSelect` argument is a mess !

The main change we want to make is that we won't try to create a tag ourselves, we just pass the originla option, and the consumer will decide how to created a tag from it.

#### The Current `onSelect` Behavior

|#| Original Option | Option in onSelect |
|-|-----------------|--------------------|
|1|`{ id: 'Alabama', value: 'Alabama', tag: { label: 'Alabama' } }` |`{ id: 'Alabama', label: 'Alabama' }` |
|2|`{  id: 'Alaska', value: 'Alaska' }` | `{ id: 'Alaska', label: React.Element, theme: undefined }` |
|3|`{ id: 'Arkansas', value: <span>Arkansas</span> }` | `{ id: 'Arkansas', label: React.Element, theme: undefined }` |
|4|`{ id: 'California', value: 'California', code: 'CA' }` | `{ id: 'California', label: React.Element, theme: undefined }`|

- Notice that in case 4, the `code` property is not available.

#### The New `onSelect` Behavior

We want to pass the original option, excluding the `value` prop.

> The `value` prop is (should be) used ONLY for rendering the option ! The consumer doesn't need it upon selection.

|#| Original Option | Option in onSelect |
|-|-----------------|--------------------|
|1|`{ id: 'Alabama', value: 'Alabama' }` |`{ id: 'Alabama' }` |
|2|`{ id: 'Arkansas', value: <span>Arkansas</span> }` | `{ id: 'Arkansas' }` |
|3|`{ id: 'California', value: 'California', code: 'CA' }` | `{ id: 'California', code: 'CA'}`|

> If the consumer wants, they can put a `tag` property on the option (which is opaque to MultiSelect), and use it upon selection to add to the tags.

### Paste logic

- Paste will automatically submit (call `onTagsAdded`).
- Paste will automatically clear the input.

## Callback Summary

### `markFirstMatchingOption === false`

|#| Options | Action               | onSelect       | onTagsAdded      |
|---|-------|----------------------|----------------|------------------|
|1  | -     | T&E(foo)             |                | [foo]            |
|2  |       | T&E(alabama)         |                | [alabama]        |
|3  |       | T&E(alab)            |                | [alab]           |
|4  |       | T&E(foo)             |                | [foo]            |
|5  | -     | Paste(foo)           |                | [foo]            |
|6  |       | Paste(alabama)       |                | [alabama]        |
|7  |       | Paste(foo)           |                | [foo]            |
|8  |       | Paste(alab)          |                | [alab]           |
|9  |       | Paste(alabama,alaska)|                | [alabama,alaska] |
|10 |       | Paste(alabama,alas)  |                | [alabama,alas]   |

> Options:
> - `-` means there is no options. Otherwise the options includes `[alabama,alaska]`
> Actions:
> - T&E: Type and press Enter

### `markFirstMatchingOption === true`

|#| Options | Action               | onSelect       | onTagsAdded      |
|---|-------|----------------------|----------------|------------------|
|1  | -     | T&E(foo)             |                | [foo]            |
|2  |       | T&E(alabama)         | [{...alabama}] |                  |
|3  |       | T&E(alab)            | [{...alabama}] |                  |
|4  |       | T&E(foo)             |                | [foo]            |
|5  | -     | Paste(foo)           |                | [foo]            |
|6  |       | Paste(alabama)       |                | [alabama]        |
|7  |       | Paste(foo)           |                | [foo]            |
|8  |       | Paste(alab)          |                | [alab]           |
|9  |       | Paste(alabama,alaska)|                | [alabama,alaska] |
|10 |       | Paste(alabama,alas)  |                | [alabama,alas]   |
