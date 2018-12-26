import React from 'react';
import CalendarPanelFooter from './CalendarPanelFooter';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';
import { calendarPanelFooterPrivateDriverFactory } from './CalendarPanelFooter.driver.private';

const createDriver = createUniDriverFactory(
  calendarPanelFooterPrivateDriverFactory,
);
describe('CalendarPanelFooter', () => {
  let driver;

  describe('render', () => {
    const primaryActionLabel = 'primaryActionLabel';
    const secondaryActionLabel = 'secondaryActionLabel';
    const primaryActionDisabled = true;
    const primaryActionOnClick = jest.fn();
    const secondaryActionOnClick = jest.fn();
    const dateToString = jest.fn();
    const selectedDays = new Date();
    beforeEach(() => {
      driver = createDriver(
        <CalendarPanelFooter
          primaryActionLabel={primaryActionLabel}
          secondaryActionLabel={secondaryActionLabel}
          primaryActionDisabled={primaryActionDisabled}
          primaryActionOnClick={primaryActionOnClick}
          secondaryActionOnClick={secondaryActionOnClick}
          dateToString={dateToString}
          selectedDays={selectedDays}
        />,
      );
    });

    it('should render', async () => {
      expect(await driver.exists()).toBe(true);
    });

    it('should show the selected days label', async () => {
      expect(await driver.getSelectedDaysLabel().exists()).toBe(true);
    });

    it('should show the secondary action button', async () => {
      expect(await driver.isSecondaryButtonExists()).toBe(true);
      expect(await driver.getSecondaryActionButtonLabel()).toBe(
        secondaryActionLabel,
      );
    });

    it('should show the primary action button', async () => {
      expect(await driver.isPrimaryButtonExists()).toBe(true);
      expect(await driver.getPrimaryActionButtonLabel()).toBe(
        primaryActionLabel,
      );
    });
  });

  describe('selected days', () => {
    it('should call dateToString once when only one day is selected', () => {
      const primaryActionLabel = 'primaryActionLabel';
      const secondaryActionLabel = 'secondaryActionLabel';
      const primaryActionDisabled = true;
      const primaryActionOnClick = jest.fn();
      const secondaryActionOnClick = jest.fn();
      const dateToString = jest.fn();
      const selectedDays = new Date();
      driver = createDriver(
        <CalendarPanelFooter
          primaryActionLabel={primaryActionLabel}
          secondaryActionLabel={secondaryActionLabel}
          primaryActionDisabled={primaryActionDisabled}
          primaryActionOnClick={primaryActionOnClick}
          secondaryActionOnClick={secondaryActionOnClick}
          dateToString={dateToString}
          selectedDays={selectedDays}
        />,
      );
      expect(dateToString).toBeCalledWith(selectedDays);
    });

    it('should call dateToString twice when range is selected', () => {
      const selectedDays = { from: new Date(2018, 1, 1), to: new Date() };
      const primaryActionLabel = 'primaryActionLabel';
      const secondaryActionLabel = 'secondaryActionLabel';
      const primaryActionDisabled = true;
      const primaryActionOnClick = jest.fn();
      const secondaryActionOnClick = jest.fn();
      const dateToString = jest.fn();
      driver = createDriver(
        <CalendarPanelFooter
          primaryActionLabel={primaryActionLabel}
          secondaryActionLabel={secondaryActionLabel}
          primaryActionDisabled={primaryActionDisabled}
          primaryActionOnClick={primaryActionOnClick}
          secondaryActionOnClick={secondaryActionOnClick}
          dateToString={dateToString}
          selectedDays={selectedDays}
        />,
      );
      expect(dateToString).toBeCalledTimes(2);
      expect(dateToString.mock.calls[0][0]).toBe(selectedDays.from);
      expect(dateToString.mock.calls[1][0]).toBe(selectedDays.to);
    });
  });

  describe('action buttons', () => {
    const primaryActionLabel = 'primaryActionLabel';
    const secondaryActionLabel = 'secondaryActionLabel';

    const selectedDays = new Date();

    it('should show primary button as disabled when primaryActionDisabled=true', async () => {
      driver = createDriver(
        <CalendarPanelFooter
          primaryActionLabel={primaryActionLabel}
          secondaryActionLabel={secondaryActionLabel}
          primaryActionDisabled
          primaryActionOnClick={jest.fn()}
          secondaryActionOnClick={jest.fn()}
          dateToString={jest.fn()}
          selectedDays={selectedDays}
        />,
      );
      expect(await driver.isPrimaryButtonDisabled()).toBe(true);
    });

    it('should show primary button as enabled when primaryActionDisabled=false', async () => {
      driver = createDriver(
        <CalendarPanelFooter
          primaryActionLabel={primaryActionLabel}
          secondaryActionLabel={secondaryActionLabel}
          primaryActionDisabled={false}
          primaryActionOnClick={jest.fn()}
          secondaryActionOnClick={jest.fn()}
          dateToString={jest.fn()}
          selectedDays={selectedDays}
        />,
      );
      expect(await driver.isPrimaryButtonDisabled()).toBe(false);
    });

    it('should call primaryActionOnClick when clicking the primary button', async () => {
      const primaryActionOnClick = jest.fn();
      driver = createDriver(
        <CalendarPanelFooter
          primaryActionLabel={primaryActionLabel}
          secondaryActionLabel={secondaryActionLabel}
          primaryActionDisabled={false}
          primaryActionOnClick={primaryActionOnClick}
          secondaryActionOnClick={jest.fn()}
          dateToString={jest.fn()}
          selectedDays={selectedDays}
        />,
      );
      await driver.clickOnPrimaryButton();
      expect(primaryActionOnClick).toBeCalled();
    });

    it('should call secondaryActionOnClick when clicking the secondary button', async () => {
      const secondaryActionOnClick = jest.fn();
      driver = createDriver(
        <CalendarPanelFooter
          primaryActionLabel={primaryActionLabel}
          secondaryActionLabel={secondaryActionLabel}
          primaryActionDisabled={false}
          primaryActionOnClick={jest.fn()}
          secondaryActionOnClick={secondaryActionOnClick}
          dateToString={jest.fn()}
          selectedDays={selectedDays}
        />,
      );
      await driver.clickOnSecondaryButton();
      expect(secondaryActionOnClick).toBeCalled();
    });
  });
});
