/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';
import styles from './ExampleStandard.scss';

class ExampleStandard extends React.Component {
  nextId = 0;

  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      inputValue: '',
    };
  }

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

  render() {
    return (
      <div>
        <div className={styles.main}>
          <MultiSelect
            dataHook="multi-select-standard"
            value={this.state.inputValue}
            onChange={this.handleOnChange}
            tags={this.state.tags}
            onTagsAdded={this.handleOnTagsAdded}
            onRemoveTag={this.handleOnRemoveTag}
          />
        </div>
      </div>
    );
  }
}

export default ExampleStandard;
