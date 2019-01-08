# MultiSelect component

> Allows selection of multiple values from options in a dropdown and displays them as Tags. Also allows creation of values not in the options (Suggestions).

## Migration (`upgrade` prop)

A new `upgrade` prop will give you a new Callback-API.

### onTagsAdded (new)

```js
onTagsAdded(values: Array<string>): void
```

Replaces `onManuallyInput` which is deprecated.

- The change is that is now called in ALL cases when an input value is submitted (Including paste).(Previously, when pasting values into the input, then `onSelect` was called).

### onSelect (changed)

```js
onSelect(option): void
```

- Always receives a single option object (and NOT an array).
- Is called ONLY when the use selects from the options (And not in value paste cases)
- The `option` object is the original option object. (And not a Tag object suggestion)

See component's New Callback API [Design-Spec](https://github.com/wix/wix-style-react/blob/master/src/MultiSelect/README.DESIGN-SPEC.md) for more info.

See the old behavior summary table in this [issue](https://github.com/wix/wix-style-react/issues/2559#issuecomment-449770857).