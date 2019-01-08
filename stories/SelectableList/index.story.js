import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';
import Checkbox from 'wix-style-react/Checkbox';

import SelectableList from '../../src/SelectableList';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: SelectableList,
  componentPath: '../../src/SelectableList/SelectableList.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    children: [<Checkbox />, <Checkbox />, <Checkbox />],
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="Live code example"
        initialCode={`
<SelectableList
  dataHook="story-selectable-list-live-example"
  children={<Checkbox/>}
  />
        `}
      />
    </div>
  ),
};
