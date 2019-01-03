# `<DropdownPopover/>`

> A common dropdown mechanism using the Popover component

There is a common behaviour of "Dropdown-like" components in our library. They have a trigger
element, and a list of items that opens when the user interacts with that trigger element. The
`<DropdownPopover/>` component is a higher-level component that encapsulates that logic, and allows
you to create "Dropdown-like" component with ease.

It uses the `<DropdownLayout/>` component to show the list of items, and the `<Popover/>`
component under the hood in order to position the list in the best way possible. It also manage
keyboard navigation out of the box.

Refer to the API section for usage info.

## Examples

By default, the playground examples is set to use the "Uncontrolled" mode. You can still control the
value of the `open` prop in order to make it "Controlled", but make sure to hit the "Clear" button
to make it "Uncontrolled" again.

----
