import { $ } from 'protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings } from '../../stories/Box/storySettings';

const baseStorySettings = {
  kind: storySettings.category,
  story: storySettings.storyName,
};

const storyUrl = createStoryUrl({
  ...baseStorySettings,
  withExamples: false,
});
const storyUrlWithExamples = createStoryUrl({
  ...baseStorySettings,
  withExamples: true,
});

const eyes = eyesItInstance();

const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);

describe('Box', () => {
  describe('AutoExample', () => {
    beforeAll(async () => await browser.get(storyUrl));

    afterEach(async () => await autoExampleDriver.remount());

    eyes.it('should be rendered', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('Examples', () => {
    beforeAll(async () => await browser.get(storyUrlWithExamples));

    eyes.it('should render a grid with two aligned inputs (horizontally and vertically)', async () => {
      const dataHook = 'storybook-box-within-grid';
      const element = byDataHook(dataHook);

      await waitForVisibilityOf(element, `Cannot find ${dataHook}`);

      expect(true).toBeTruthy();
    });
  });
});
