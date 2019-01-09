# MultiSelect Migration Guide

## Migration From 5.x.x to ?.x.x (`upgrade` prop)

A new `upgrade` prop (introduced in 5.?.? ) will give you a new Callback-API.
The new API will be available in the next major version by default.

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

#### When is it called

Called ONLY when the user selects from the options (And not in value paste cases)

#### The Argument

- **Previously**: `onSelect` would get an array of tag objects. These could be passed straight to the `tags` prop.
- **Now**: you get the original `option` object, and you need to create the tag object yourself.

> Notice-1: You can put any properties you need on the `option` object, so you can later use them when an option is selected.

> Notice-2: This means that the `valueParser` is no longer needed, since you are responsible for creating a Tag from an Option.

> Notice-3: Keep in mind that the `value` property of an option is a ReactNode, it is what gets renderedas an option. So if you use something other than a string, then you shouldn't have to deal with it in the `onSelect` handling.

##### Tag objects

Tag objects are simply props of the [12.5-Tag component](https://wix-wix-style-react.surge.sh/?selectedKind=12.%20Other&selectedStory=12.5%20Tag&full=0&addons=0&stories=1&panelRight=0) only that instead of children prop, you need to have a `label` prop.

> A simple default tag with "Alabama" as label

```js
{ id: "1", label: "Alabama" }
```

### valueParser

`valueParser` is deprecated (not used). It was used to match Options with the input value when Paste is detected. We don't do that anymore, when Paste is detected, we simply call `onTagsAdded` with the inptu value.

### More Info

See component's New Callback API [Design-Spec](https://github.com/wix/wix-style-react/blob/master/src/MultiSelect/README.DESIGN-SPEC.md) for more info.

See the old behavior summary table in this [issue](https://github.com/wix/wix-style-react/issues/2559#issuecomment-449770857).
