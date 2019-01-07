/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';
import { contactItemBuilder } from 'wix-style-react/ContactItemBuilder';

const contacts = [
  { name: 'David Fincher', email: 'davidf@wix.com' },
  { name: 'John Doe', email: 'johnd@wix.com' },
  { name: 'Jane Martin', email: 'janem@wix.com' },
  { name: 'David ', email: 'davidf@gmail.com' },
  { name: 'John Doe', email: 'johnd@gmail.com' },
  { name: 'Jane Martin', email: 'janem@gmail.com' },
];

export const options = contacts.map(contact => ({
  ...contact,
  ...contactItemBuilder({
    id: contact.email,
    title: contact.name,
    subtitle: contact.email,
    imageUrl: 'https://randomuser.me/api/portraits/women/39.jpg',
  }),
}));

class ExampleSuggestions extends React.Component {
  nextId = 0;

  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      inputValue: '',
    };
  }

  createTag({ name, email }) {
    return {
      id: String(this.nextId++),
      label: name ? `${email} (${name})` : email,
    };
  }

  handleOnSelect = selectedOptions => {
    console.log('onSelect(selectedOptions): selectedOptions=', selectedOptions);
    const tags = selectedOptions.map(option =>
      this.createTag({
        name: option.name,
        email: option.email,
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

  handleOnTagsAdded = values => {
    console.log(`onTagsAdded(values): values=${values}`);
    const tags = values.map(value => this.createTag({ email: value }));
    this.setState({ tags: [...this.state.tags, ...tags] });
  };

  predicate = option =>
    `${option.name} + ${option.emial}`
      .toLowerCase()
      .includes(this.state.inputValue.toLowerCase());

  render() {
    return (
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
        upgrade
        highlight={false} // FIXME: This is a workaround a current bug
      />
    );
  }
}

export default ExampleSuggestions;
