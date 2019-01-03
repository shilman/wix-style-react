/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';
import styles from './ExampleStandard.scss';

const ARBITRARY_FUNCTION_TO_ENABLE_NEW_API = () => {};

const countries = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'North Carolina', code: 'NC' },
];

export const options = countries.map(country => ({
  ...country,
  value: country.name, // This can be any ReactNode
  id: country.code,
}));

class ExampleSelectOnly extends React.Component {
  nextId = 0;

  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      inputValue: '',
    };
  }

  createTag({ countryName, countryCode }) {
    return {
      id: countryCode, // When tag ids correspond to option ids, then MultiSelect will show only unselected options.
      label: `${countryName} (${countryCode || '?'})`,
    };
  }

  handleOnSelect = selectedOptions => {
    console.log('onSelect(selectedOptions): selectedOptions=', selectedOptions);
    const tags = selectedOptions.map(option =>
      this.createTag({
        countryName: option.name,
        countryCode: option.code,
      }),
    );
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

  predicate = option =>
    option.name &&
    option.name.toLowerCase().includes(this.state.inputValue.toLowerCase());

  render() {
    return (
      <div>
        <div className={styles.main}>
          <MultiSelect
            dataHook="multi-select-only"
            value={this.state.inputValue}
            onChange={this.handleOnChange}
            options={options}
            tags={this.state.tags}
            onSelect={this.handleOnSelect}
            onRemoveTag={this.handleOnRemoveTag}
            predicate={this.predicate}
            onTagsAdded={ARBITRARY_FUNCTION_TO_ENABLE_NEW_API}
          />
        </div>
      </div>
    );
  }
}

export default ExampleSelectOnly;
