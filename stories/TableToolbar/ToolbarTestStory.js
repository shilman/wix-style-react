import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../storiesHierarchy';
import MainExample from './MainExample';
import { storySettings } from './storySettings';
import { RTLWrapper } from '../utils';

const kind = getTestStoryKind({
  category: storySettings.category,
  storyName: storySettings.storyName,
});

storiesOf(kind, module).add('1. Toolbar', () => {
  return (
    <RTLWrapper>
      <MainExample />
    </RTLWrapper>
  );
});
