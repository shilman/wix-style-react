## MultiSelect Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| delimiters | array | [','] (also Enter and Tab) | - | delimiters that will be treated like enter press |
| disabled | bool | false | - | When set to true this component is disabled |
| fixedHeader | node | - | - | A fixed header to the list |
| fixedFooter | node | - | - | A fixed footer to the list |
| id | string or number | '' | - | An identifier of the component |
| maxNumRows | number | - | - | Max number of visible lines |
| mode | string | - | - | passing `'select'`  will render a readOnly input with menuArrow suffix
| onChange | func | - | + | A callback function to be called when the input value changed|
| onSelect | func | - | - | A callback which is called when the user selects an option from the list. The callback receives one argument which is an array of the newly selected option objects (Usually one). Each object is the original options object excluding the 'value' property. |
| onTagsAdded | func | noop | - | A callback which is called when the user performs a Submit action. Submit action triggers are: "Enter", "Tab", [typing any defined delimiters], Paste action. The callback receives one argument which is an array of strings, which are the result of splitting the input value by the given delimiters |
| options | array of option | [] | - | Array of objects. Objects must have an Id and can can include *value* and *node*. If value is '-', a divider will be rendered instead. |
| onRemoveTag | func | - | + | A callback function to be called when a tag should be removed|
| onReorder | func | - | - | When this callback function is set, tags can be reordered. The expected callback signature is `({addedIndex: number, removedIndex: number}) => void`|
| placeholder | string | - | - | the placeholder for the input|
| predicate | func | () => true | - | Callback predicate for the filtering options function |
| tags | array of objects | - | + | Each item in the array is a props object for the Tag component (12.5 Tag) |
| upgrade  |          |              |            | Use latest API |
| value | string | - | - | The value of the current input |
| ***All of the InputWithOptions Props are also available for this component*** | | | | |

## Option (See DropdownLayout options)

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| id | string or number | - | + | The id of the option, should be unique |
| value | string or node | - | + | Can be a text or a react elements, if text is '-', a divider will render at that position. |
| disabled | bool | false | - | Whether this option is disabled or not |
