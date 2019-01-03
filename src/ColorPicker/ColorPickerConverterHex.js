import React from 'react';
import color from 'color';
import { object, func } from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';

import css from './ColorPickerConverter.scss';

export default class ColorPickerConverterHex extends WixComponent {
  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.state = {
      hex: props.current.hex(),
      inFocus: false,
    };
  }

  render() {
    return (
      <div className={css.root}>
        <Input
          size="small"
          value={this.state.hex}
          onChange={this.change}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }

  componentWillReceiveProps(props) {
    if (!this.state.inFocus && this.state.hex !== props.current.hex()) {
      this.setState({
        hex: props.current.hex(),
      });
    }
  }

  change({ target: { value } }) {
    this.setState({ hex: value }, () => {
      const _color = safeColor(value);
      if (_color) {
        this.props.onChange(_color);
      }
    });
  }

  handleOnFocus = () => {
    this.setState({
      inFocus: true,
    });
  };

  handleOnBlur = () => {
    this.setState({
      inFocus: false,
      hex: this.props.current.hex(),
    });
  };

  handleKeyDown = event => {
    const { key } = event;

    if (key === 'Enter') {
      this.props.onEnter();
    }
  };
}

function safeColor(input) {
  try {
    return color(input);
  } catch (error) {
    return null;
  }
}
