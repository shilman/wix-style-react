import Box from '../../src/Box';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Box,
  componentPath: '../../src/Box',

  componentProps: () => ({
    dataHook: storySettings.dataHook,
  }),
};
