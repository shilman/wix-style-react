import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import { default as PopoverMenu } from '../../src/PopoverMenu';
import { default as PopoverMenuItem } from '../../src/PopoverMenuItem';
import { storySettings } from './storySettings';
import ExampleBasic from './ExampleBasic';
import ExampleBasicRaw from '!raw-loader!./ExampleBasic';
import ExampleDisabled from './ExampleDisabled';
import ExampleDisabledRaw from '!raw-loader!./ExampleDisabled';
import ExampleDisabledLarge from './ExampleDisabledLarge';
import ExampleDisabledLargeRaw from '!raw-loader!./ExampleDisabledLarge';
import { createAutoExampleWrapper } from '../AutoExampleWrapper';

const exampleContainerStyle = {
  display: 'flex',
  backgroundColor: '#f6f8fa',
  minHeight: '50px',
  alignItems: 'center',
  justifyContent: 'center',
};

const exampleItems = [
  <PopoverMenuItem
    dataHook={storySettings.itemDataHook}
    text="Edit"
    onClick={() => {}}
  />,
  <PopoverMenuItem
    dataHook={storySettings.itemDataHook}
    text="Hide"
    onClick={() => {}}
  />,
  <PopoverMenuItem
    dataHook={storySettings.itemDataHook}
    text="Delete"
    onClick={() => {}}
  />,
];

const exampleChildren = [
  {
    label: 'One item',
    value: exampleItems.slice(0, 1),
  },
  {
    label: 'Two items',
    value: exampleItems.slice(0, 2),
  },
  {
    label: 'Three items',
    value: exampleItems,
  },
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: createAutoExampleWrapper(PopoverMenu),
  componentPath: '../../src/PopoverMenu/PopoverMenu.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    size: 'normal',
    placement: 'right',
    buttonTheme: 'icon-greybackground',
    children: exampleChildren[0].value,
  },

  exampleProps: {
    children: exampleChildren,
  },

  examples: (
    <div>
      <CodeExample title="Standard with icons" code={ExampleBasicRaw}>
        <div style={exampleContainerStyle}>
          <ExampleBasic />
        </div>
      </CodeExample>
      <CodeExample title="Disabled item" code={ExampleDisabledRaw}>
        <div style={exampleContainerStyle}>
          <ExampleDisabled />
        </div>
      </CodeExample>
      <CodeExample
        title="Disabled item within a large popover menu"
        code={ExampleDisabledLargeRaw}
      >
        <div style={exampleContainerStyle}>
          <ExampleDisabledLarge />
        </div>
      </CodeExample>
    </div>
  ),
};
