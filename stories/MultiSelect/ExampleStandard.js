/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';
import styles from './ExampleStandard.scss';

export const options = [
  { id: 'Alabama', value: 'Alabama' },
  { id: 'Alaska', value: 'Alaska' },
  { id: 'Arizona', value: 'Arizona' },
  { id: 'Arkansas', value: 'Arkansas' },
  { id: 'divider1', value: '-' },
  { id: 'California', value: 'California' },
  { id: 'Two Words', value: 'Two Words' },
];

class ExampleStandard extends React.Component {
  nextId = 0;

  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      inputValue: '',
    };
  }

  handleOnSelect = selectedOptions => {
    console.log('onSelect(selectedOptions): selectedOptions=', selectedOptions);
    const tags = selectedOptions.map(option => {
      const tag = { id: option.id, label: option.id };
      return tag;
    });
    this.setState({ tags: [...this.state.tags, ...tags] });
  };

  handleOnRemoveTag = tagId => {
    console.log(`onRemoveTag(tagId): tagId=${tagId})`);
    this.setState({
      tags: this.state.tags.filter(currTag => currTag.id !== tagId),
    });
  };

  handleOnChange = event => {
    console.log(`onChange('${event.target.value}')`);
    this.setState({ inputValue: event.target.value });
  };

  handleOnTagsAdded = values => {
    console.log(`onTagsAdded(values): values=${values}`);
    const tags = values.map(value => {
      const tag = { id: String(this.nextId++), label: value };
      return tag;
    });
    this.setState({ tags: [...this.state.tags, ...tags] });
  };

  predicate = option =>
    option.id &&
    option.id.toLowerCase().includes(this.state.inputValue.toLowerCase());

  render() {
    return (
      <div>
        <div className={styles.main}>
          <MultiSelect
            dataHook="multi-select-standard"
            value={this.state.inputValue}
            onChange={this.handleOnChange}
            options={options}
            tags={this.state.tags}
            onTagsAdded={this.handleOnTagsAdded}
            onSelect={this.handleOnSelect}
            onRemoveTag={this.handleOnRemoveTag}
            predicate={this.predicate}
          />
        </div>
      </div>
    );
  }
}

export default ExampleStandard;
