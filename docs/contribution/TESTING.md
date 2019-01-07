# Testing

> For component library to be stable, it must be testable and tested

## Test Types

### Component (Unit) Tests

1. Tests are running with [`jest`](https://facebook.github.io/jest/).

1. Tests in this API level are ones that require browser-like environment but can still run without any visual rendering. The nature of these tests is testing the behavior of a component and wiring methods. For example: clicking on a component triggers a callback, changing the input value, etc...

1. Every component has test file with `spec.js` extension, for example: `ComponentName.spec.js`.

1. Every component has a driver (read about [them here](./TEST_DRIVERS.md)). Naming convention is `ComponentName.driver.js`

### Example

```js
import React from 'react';
import checkboxDriverFactory from './Checkbox.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';

describe('Checkbox', () => {
  const createDriver = createDriverFactory(checkboxDriverFactory);

  it('should be unchecked and not disabled by default', () => {
    const driver = createDriver(<Checkbox/>);
    expect(driver.isChecked()).toBeFalsy();
    expect(driver.isDisabled()).toBeFalsy();
  });
});
```

### Browser (E2E) Tests

#### General

1. We test components in browser only if browser API is needed (e.g. position calculations, hovering, styling) or need to determine visual changes.
1. Tests run with [`protractor`](http://www.protractortest.org/#/) which uses chrome browser.
1. Visual regression tests are done with [`eyes`](https://github.com/wix/eyes.it) (powered by applitools).

#### File Structure

1. Every component has test file with `e2e.js` extension, for example: `ComponentName.e2e.js`.
1. Every component has a driver (read about [them here](./TEST_DRIVERS.md)). Naming convention is `ComponentName.protractor.driver.js`

#### Visual testing

1. Every test uses `eyes.it()` to automatically capture screenshots at the beginning and end of test.

1. Use `eyes.checkWindow()` to capture a screenshot explicitly.

```js
import eyes from 'eyes.it';

eyes.it('should test something with screenshot diff', async () => {
  expect(await assert).toEqual(expectation);
});

eyes.it('should test something with a screenshot on demand', async () => {
  // do some manipulation, for example scroll
  await eyes.checkWindow('after scrolling');
  // do other manipulations
});
```

#### Test pages

1. Tests pages are the actual documentation done in `storybook`.

1. You may run test on the story's Playground, or on it's examples.

1. You may create a dedicated test story page and add it to the `Tests` category in the storybook. Use:

```js
import {getTestStoryKind} from '../storyHierarchy';

const kind = getTestStoryKind({category: 'Layout', storyName: 'Cell'});
storiesOf(kind, module)
  .add('1. Test Page #1', () =>
    <div>
      My Test Page
    </div>
  );
```

#### See also

1. See [Writing E2E Tests](./WRITING_E2E_TESTS.md)

## Running tests

### Running all

1. `npm run build && npm run test`

### Running unit tests

1. single run: `npm run test:unit`

1. watch mode: `npm run test:watch`

1. watch mode + storybook: `npm start`

#### Debugging

1. In watch mode, you can use `jest`'s interactive mode, for example, press `p` in your command line and type the name of the test:
<img src="https://raw.githubusercontent.com/wix/wix-style-react/master/docs/assets/jest-interactive.png" alt="Interactive Jest Preview" width="600">

### Running browser tests

#### Single Run

`npm run build && npm run test:e2e`

- `npm run build` creates `storybook-static` folder
- `npm run test:e2e` serves the storybook from `storybook-static` folder.
- Changing tests doesn't require rebuilding.

### "watch" mode

- `npm run storybook` - start storybook server with hot module reload
- open another terminal console
- `npm run test:e2e-only` - run protractor tests

#### Running a single test (focused test)

- To make a focused test (only it runs) use `fit` instead of `it`
- Or use `eyes.fit` instead of `eyes.it`.

#### Debugging

1. Use `await browser.sleep(100000)` in your test, for quick browser stop and debugging.
