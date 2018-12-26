import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import CalendarPanelFooter from '../../src/CalendarPanelFooter';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: CalendarPanelFooter,
  componentPath: '../../src/CalendarPanelFooter/CalendarPanelFooter.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    primaryActionDisabled: false,
    primaryActionOnClick: () => null,
    secondaryActionOnClick: () => null,
    dateToString: () => 'simple string',
    selectedDays: new Date(),
    primaryActionLabel: 'submit',
    secondaryActionLabel: 'cancel',
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  //   examples: (
  //     <div style={{ maxWidth: 627 }}>
  //       <LiveCodeExample
  //         compact
  //         title="Live code example"
  //         initialCode={`
  // <CalendarPanelFooter
  //   dataHook="story-calendar-panel-footer-live-example"
  //   primaryActionDisabled={false}
  //     primaryActionOnClick={() => null}
  //     secondaryActionOnClick={() => null}
  //     dateToString={() => 'simple string'}
  //     selectedDays={new Date()}
  //     primaryActionLabel={'submit'}
  //     secondaryActionLabel={'cancel'}
  //   />
  //         `}
  //       />
  //     </div>
  //   ),
};
