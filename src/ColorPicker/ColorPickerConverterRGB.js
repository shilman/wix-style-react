import React from 'react';
import color from 'color';
import { object, func } from 'prop-types';
import mapValues from '../utils/operators/mapValues';

import WixComponent from '../BaseComponents/WixComponent';
import Input from '../Input';

import css from './ColorPickerConverter.scss';

export default class ColorPickerConverterRGB extends WixComponent {
  static propTypes = {
    current: object.isRequired,
    onChange: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = mapValues(props.current.rgb().object(), Math.round);
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.distribute}>
          <Input
            size="small"
            value={this.state.r}
            onChange={e => this.change('r', e)}
          />
          <Input
            size="small"
            value={this.state.g}
            onChange={e => this.change('g', e)}
          />
          <Input
            size="small"
            value={this.state.b}
            onChange={e => this.change('b', e)}
          />
        </div>
      </div>
    );
  }

  componentWillReceiveProps(props) {
    this.setState(mapValues(props.current.rgb().object(), Math.round));
  }

  change(
    part,
    {
      target: { value },
    },
  ) {
    this.setState({ [part]: value }, () => {
      const _color = safeColor(this.state);
      if (_color) {
        this.props.onChange(_color);
      }
    });
  }
}

function safeColor(input) {
  try {
    return color(input);
  } catch (error) {
    return null;
  }
}
