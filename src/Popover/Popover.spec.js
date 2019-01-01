import React from 'react';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';

import Popover from './Popover';
import popoverDriverFactory from './Popover.driver';

describe('Popover', () => {
  const createDriver = createDriverFactory(popoverDriverFactory);

  it('should render', () => {
    const driver = createDriver(
      <Popover>
        <Popover.Element>
          <div>I am the trigger!</div>
        </Popover.Element>

        <Popover.Content>
          <div>I am the content!</div>
        </Popover.Content>
      </Popover>,
    );

    expect(driver.exists()).toBeTruthy();
  });

  it("should inherit core's driver methods", () => {
    const onClickFn = jest.fn();

    const driver = createDriver(
      <Popover shown onClick={onClickFn}>
        <Popover.Element>I am the trigger!</Popover.Element>
        <Popover.Content>I am the content!</Popover.Content>
      </Popover>,
    );

    expect(driver.isTargetElementExists()).toBe(true);
    expect(driver.isContentElementExists()).toBe(true);

    driver.click();
    expect(onClickFn).toHaveBeenCalledTimes(1);
  });

  describe('propTypes validation', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(jest.fn());
    });

    it('should throw a PropType error when not provided with Popover.Element', () => {
      createDriver(
        <Popover>
          <Popover.Content>I am the content!</Popover.Content>
        </Popover>,
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Warning: Failed prop type: Invalid children provided, <Popover.Element/> must be provided\n    in Popover',
      );
    });

    it('should throw a PropType error when not provided with Popover.Content', () => {
      createDriver(
        <Popover>
          <Popover.Element>I am the Element!</Popover.Element>
        </Popover>,
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Warning: Failed prop type: Invalid children provided, <Popover.Content/> must be provided\n    in Popover',
      );
    });

    it('should throw a PropType error when provided with unknown child', () => {
      createDriver(
        <Popover>
          <Popover.Element>I am the Element!</Popover.Element>
          <Popover.Content>I am the content!</Popover.Content>
          <div>Who am I? What am I?</div>
        </Popover>,
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Warning: Failed prop type: Invalid children provided, unknown child <div/> supplied\n    in Popover',
      );
    });
  });
});
