import React from 'react';
import { object, bool, func } from 'prop-types';

import WixComponent from '../BaseComponents/WixComponent';
import Tabs from '../Tabs';
import ColorPickerConverterHex from './ColorPickerConverterHex';
import ColorPickerConverterRGB from './ColorPickerConverterRGB';
import ColorPickerConverterHsb from './ColorPickerConverterHsb';

const HEX = 'HEX';
const RGB = 'RGB';
const HSB = 'HSB';

const tabs = [
  { id: HEX, title: HEX },
  { id: RGB, title: RGB },
  { id: HSB, title: HSB },
];

export default class ColorPickerConverter extends WixComponent {
  static propTypes = {
    current: object.isRequired,
    showConverter: bool.isRequired,
    showInput: bool.isRequired,
    onChange: func.isRequired,
    onEnter: func.isRequired,
  };

  state = {
    activeTab: HEX,
  };

  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }

  render() {
    const { current, showConverter, showInput } = this.props;
    const dataHooks = {
      hex: 'color-picker-hex-input',
      rgb: 'color-picker-rgb-inputs',
      hsb: 'color-picker-hsb-inputs',
    };

    if (!showConverter && !showInput) {
      return null;
    }

    if (!showConverter) {
      return (
        <ColorPickerConverterHex
          dataHook={dataHooks.hex}
          current={current}
          onChange={this.props.onChange}
          onEnter={this.props.onEnter}
        />
      );
    }

    const { activeTab } = this.state;

    return (
      <div>
        <Tabs
          minWidth={0}
          items={tabs}
          activeId={activeTab}
          type="uniformFull"
          onClick={this.changeTab}
        />
        {activeTab === HEX && (
          <ColorPickerConverterHex
            dataHook={dataHooks.hex}
            current={current}
            onChange={this.props.onChange}
            onEnter={this.props.onEnter}
          />
        )}
        {activeTab === RGB && (
          <ColorPickerConverterRGB
            dataHook={dataHooks.rgb}
            current={current}
            onChange={this.props.onChange}
          />
        )}
        {activeTab === HSB && (
          <ColorPickerConverterHsb
            dataHook={dataHooks.hsb}
            current={current}
            onChange={this.props.onChange}
          />
        )}
      </div>
    );
  }

  changeTab({ id }) {
    this.setState({ activeTab: id });
  }
}
