import Box from '../../src/Box';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Box,
  componentPath: '../../src/Box',

  componentProps: () => ({
    children: 'Children',
    align: 'center',
    verticalAlign: 'middle',
    padding: 2,
    margin: 1,
    inline: false,
    dataHook: storySettings.dataHook,
  }),
};
