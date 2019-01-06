# ButtonWithOptions component

> options component for Button. (Click to see in action)

**The `<ButtonWithOptions/>` component is deprecated in will be removed in a later version if the
library. Instead, we advise you to use the newer `<DropdownPopover/>` component which has a better
positioning mechanism and supports keyboard navigation.**

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| onSelect | func | noop | - | Callback when the user selects one of the selections. Called with the selection and a flag indicates whether the selected option was already selected `(selectedId, wasPreviouslySelected)`  |
| restrainDropdownSize | bool | true | - | Restrain dropdown width to button's width |
| ***All of the Button's and DropdownLayout Props are also available for this component*** | | | | |

> ButtonWithOptions.Button - the Button component to be used
- Required as first child of ButtonWithOptions

> ButtonWithOptions.Option - an option to be used for the dropdown
- Must contain ID
- Must have only one child
