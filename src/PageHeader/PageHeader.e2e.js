import { eyesItInstance } from '../../test/utils/eyes-it';

import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { pageHeaderTestkitFactory } from '../../testkit/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';

import { storySettings } from '../../stories/PageHeader/storySettings';

describe('PageHeader', () => {
  const eyes = eyesItInstance();

  const testStoryUrl = ({ testName, rtl }) =>
    createTestStoryUrl({ ...storySettings, testName, rtl });

  const initTest = async ({ testName, rtl }) => {
    await browser.get(testStoryUrl({ testName, rtl }));
    const dataHook = 'story-page-header';
    const driver = pageHeaderTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find PageHeader');
    return driver;
  };

  describe('Long title', () => {
    eyes.it('should disaply multiline title and subtitle', async () => {
      await initTest({ testName: '1. Long Title and Subtitle' });
    });
  });

  describe('RTL', () => {
    eyes.it('should disaply multiline title and subtitle', async () => {
      await initTest({ testName: '1. Long Title and Subtitle', rtl: true });
    });
  });
});
