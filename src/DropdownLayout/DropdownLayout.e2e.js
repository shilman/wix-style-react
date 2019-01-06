import eyes from 'eyes.it';
import { sleep } from 'wix-ui-test-utils/react-helpers';

import { dropdownLayoutTestkitFactory } from '../../testkit/protractor';
import {
  createStoryUrl,
  scrollToElement,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { browser } from 'protractor';

async function waitForFetching() {
  await sleep(700);
}

describe('DropdownLayout', () => {
  let driver;

  const storyUrl = createStoryUrl({
    kind: '11. Pickers and Selectors',
    story: '11.1 DropdownLayout',
    withExamples: false,
  });

  beforeAll(async () => {
    browser.get(storyUrl);

    driver = dropdownLayoutTestkitFactory({
      dataHook: 'infinite-scroll-dropdownLayout',
    });
  });

  beforeEach(async () => {
    await waitForVisibilityOf(
      driver.element(),
      'Cant find infinite scroll dropdownLayout',
    );

    await waitForFetching();
    await scrollToElement(driver.element());
  });

  eyes.it('should render items properly', async () => {
    expect(await driver.getDropdownItem(0)).toEqual('options 0');
  });

  eyes.it('should add more items from server when scrolling down', async () => {
    expect(await driver.getDropdownItemsCount()).toEqual(15);

    await driver.scrollToElement(14);
    await waitForFetching();

    expect(await driver.getDropdownItemsCount()).toEqual(30);
  });

  eyes.it('should show loader', async () => {
    await driver.scrollToElement(14);

    expect(await driver.loaderExists()).toBeTruthy();
  });
});
