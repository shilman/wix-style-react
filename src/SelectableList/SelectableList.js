import React, { Children } from 'react';
import { generateID } from '../utils/generateId';

const mapChildrenToId = children =>
  Children.toArray(children).reduce(
    (a, c) => ({
      ...a,
      [generateID()]: c,
    }),
    {},
  );

class SelectableList extends React.Component {
  static displayName = 'SelectableList';

  constructor(props) {
    super(props);
    this.state = {
      items: mapChildrenToId(props.children),
      selected: [],
    };
  }
  _change = (e, key) => {
    const { selected, items } = this.state;

    if (selected.includes(key)) {
      this.setState(
        state => ({
          selected: state.selected.filter(value => value !== key),
        }),
        this.props.onDeselect(items[key]),
      );
    } else {
      this.setState(
        state => ({
          selected: [...state.selected, key],
        }),
        this.props.onSelect(items[key]),
      );
    }
  };

  render() {
    const { dataHook } = this.props;
    const { items, selected } = this.state;
    return (
      <div data-hook={dataHook}>
        {Object.entries(items).map(([key, value]) =>
          React.cloneElement(value, {
            key,
            onChange: e => this._change(e, key),
            checked: selected.includes(key),
          }),
        )}
      </div>
    );
  }
}

export default SelectableList;
