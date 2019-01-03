import ColorPicker from '../../src/ColorPicker';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: ColorPicker,
  componentPath: '../../src/ColorPicker',

  componentProps: setProps => ({
    value: '#3899eb',
    onChange: value => setProps({ value: value.hex() }),
    dataHook: storySettings.dataHook,
  }),

  exampleProps: {
    onChange: ev => ev.hex(),
    onCancel: () => 'Cancelled',
    onConfirm: () => 'Confirmed',
  },
};
