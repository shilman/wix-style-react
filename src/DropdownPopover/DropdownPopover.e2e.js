import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { dropdownPopoverTestkitFactory } from '../../testkit/protractor';
import { storySettings } from '../../stories/DropdownPopover/storySettings';

const eyes = eyesItInstance();

describe('DropdownPopover', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
  });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = dropdownPopoverTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <DropdownPopover/> component with dataHook of ${dataHook}`,
    );

    await scrollToElement(await driver.element());

    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  eyes.it('should render', async () => {
    await createDriver();
  });

  [
    'story-dropdown-popover-uncontrolled-click',
    'story-dropdown-popover-uncontrolled-icon',
    'story-dropdown-popover-controlled-mouse',
    'story-dropdown-popover-controlled-input',
  ].forEach(dataHook => {
    eyes.it(`should render ${dataHook}`, async () => {
      const driver = await createDriver(dataHook);
      await driver.clickTargetElement();
    });
  });
});
