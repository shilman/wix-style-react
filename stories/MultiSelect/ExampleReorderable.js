/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';

const ARBITRARY_FUNCTION_TO_ENABLE_NEW_API = () => {};

export const options = [
  { id: '1', name: 'One', value: 'One' },
  { id: '2', name: 'Two', value: 'Two' },
  { id: '3', name: 'Three', value: 'Three' },
];

class ExampleReorderable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      options,
      inputValue: '',
    };
  }

  handleOnSelect = selectedOptions => {
    console.log('onSelect(selectedOptions): selectedOptions=', selectedOptions);
    const tags = selectedOptions.map(option => ({
      id: option.id,
      label: <span>{option.name}</span>,
    }));
    this.setState({ tags: [...this.state.tags, ...tags] });
  };

  handleOnRemoveTag = tagId =>
    this.setState({
      tags: this.state.tags.filter(currTag => currTag.id !== tagId),
    });

  handleOnChange = event => this.setState({ inputValue: event.target.value });

  render() {
    const { tags } = this.state;
    return (
      <MultiSelect
        dataHook="multi-select-reorderable"
        tags={this.state.tags}
        onSelect={this.handleOnSelect}
        onRemoveTag={this.handleOnRemoveTag}
        onReorder={({ addedIndex, removedIndex }) => {
          const nextTags = tags.slice();
          nextTags.splice(addedIndex, 0, ...nextTags.splice(removedIndex, 1));
          this.setState({
            tags: nextTags,
          });
        }}
        value={this.state.inputValue}
        onChange={this.handleOnChange}
        options={options}
        mode="select"
        onTagsAdded={ARBITRARY_FUNCTION_TO_ENABLE_NEW_API}
      />
    );
  }
}

export default ExampleReorderable;
