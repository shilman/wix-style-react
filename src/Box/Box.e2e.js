import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

const storyUrl = createStoryUrl({
  kind: 'Components',
  story: 'Box',
  withExamples: false,
});

const eyes = eyesItInstance();

describe('Box', () => {
  beforeAll(() => browser.get(storyUrl));

  afterEach(async () => await autoExampleDriver.remount());

  eyes.it('should be rendered', () => {
    expect(true).toBeTruthy();
  });
});
