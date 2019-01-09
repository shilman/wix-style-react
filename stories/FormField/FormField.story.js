import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';

import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';
import RichTextArea from 'wix-style-react/RichTextArea';
import DatePicker from 'wix-style-react/DatePicker';
import Dropdown from 'wix-style-react/Dropdown';
import Checkbox from 'wix-style-react/Checkbox';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';

import ExampleWithLengthCount from './ExampleWithLengthCount';
import ExampleWithLengthCountRaw from '!raw-loader!./ExampleWithLengthCount';
import ExampleWithinGrid from './ExampleWithinGrid';
import ExampleWithinGridRaw from '!raw-loader!./ExampleWithinGrid';

const ID = 'formFieldId';

const placeholder = 'Default text goes here...';
const childrenExamples = [
  { label: 'Input', value: <Input placeholder={placeholder} id={ID} /> },

  {
    label: 'Input with char counter',
    // eslint-disable-next-line react/prop-types
    value: ({ setCharactersLeft }) => (
      <Input
        placeholder={placeholder}
        onChange={e => setCharactersLeft(50 - e.target.value.length)}
        id={ID}
      />
    ),
  },

  {
    label: 'InputArea',
    value: <InputArea placeholder={placeholder} id={ID} />,
  },

  {
    label: 'InputArea with char counter',
    // eslint-disable-next-line react/prop-types
    value: ({ setCharactersLeft }) => (
      <InputArea
        placeholder={placeholder}
        id={ID}
        onChange={e => setCharactersLeft(50 - e.target.value.length)}
      />
    ),
  },

  { label: 'RichTextArea', value: <RichTextArea placeholder={placeholder} /> },

  { label: 'DatePicker', value: <DatePicker value={new Date()} /> },

  {
    label: 'Dropdown',
    value: (
      <Dropdown
        placeholder="Select dominant hand"
        options={[
          { id: 0, value: 'Left' },
          { id: 1, value: 'Right' },
          { id: 2, value: 'Ambidextrous' },
        ]}
      />
    ),
  },

  { label: 'Checkbox', value: <Checkbox /> },

  { label: 'ToggleSwitch', value: <ToggleSwitch /> },
];

export default {
  category: 'Components',
  storyName: 'FormField',
  component: FormField,
  componentPath: '../../src/FormField',

  componentProps: {
    dataHook: 'storybook-formfield',
    children: childrenExamples[0].value,
    label: 'This is an input:',
    labelPlacement: 'top',
    required: true,
    infoContent: 'I help you to fill info',
    stretchContent: true,
    id: 'formFieldId',
  },

  exampleProps: {
    children: childrenExamples,
    infoTooltipProps: [
      { label: 'placement left', value: { placement: 'left' } },
    ],
  },
  examples: (
    <div>
      <CodeExample title="With Length Count" code={ExampleWithLengthCountRaw}>
        <div style={{ width: '500px' }}>
          <ExampleWithLengthCount />
        </div>
      </CodeExample>

      <CodeExample title="Within Grid" code={ExampleWithinGridRaw}>
        <div>
          <ExampleWithinGrid />
        </div>
      </CodeExample>
    </div>
  ),
};
