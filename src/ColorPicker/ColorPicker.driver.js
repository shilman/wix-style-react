import ReactTestUtils from 'react-dom/test-utils';

export const colorPickerDriverFactory = ({ element }) => {
  return {
    exists: () => !!element,
    confirm: () =>
      ReactTestUtils.Simulate.click(
        element.querySelector('[data-hook="color-picker-confirm-button"]'),
      ),
    clickOnPreviousColor: () =>
      ReactTestUtils.Simulate.click(
        element.querySelector('[data-hook="color-picker-history-previous"]'),
      ),
    historyPanelExists: () =>
      !!element.querySelector('[data-hook="color-picker-history"]'),
    historyCurrentColor: () =>
      element.querySelector('[data-hook="color-picker-history-current"]').style
        .background,
    historyPreviousColor: () =>
      element.querySelector('[data-hook="color-picker-history-previous"]').style
        .background,
  };
};
