import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { buttonDriverFactory } from '../Button/Button.driver';

export const calendarPanelFooterDriverFactory = base => {
  const getByDataHook = dataHook => base.$(`[data-hook=${dataHook}]`);
  const getButtonTestkitByDataHook = async dataHook => {
    const buttonElem = await getByDataHook(dataHook);
    return buttonDriverFactory(buttonElem);
  };
  const getButtonLabel = async dataHook => {
    const button = await getButtonTestkitByDataHook(dataHook);
    return button.getButtonTextContent();
  };

  const getButtonIsDisabled = async dataHook => {
    const button = await getButtonTestkitByDataHook(dataHook);
    return button.isButtonDisabled();
  };

  const getIsButtonExists = async dataHook => {
    const button = await getButtonTestkitByDataHook(dataHook);
    return button.exists();
  };

  const clickOnButton = async dataHook => {
    const button = await getButtonTestkitByDataHook(dataHook);
    return button.click();
  };

  const primaryButtonDataHook = 'primary-action-button';
  const secondaryButtonDataHook = 'secondary-action-button';

  return {
    ...baseUniDriverFactory(base),
    isPrimaryButtonExists: () => getIsButtonExists(primaryButtonDataHook),
    isSecondaryButtonExists: () => getIsButtonExists(secondaryButtonDataHook),
    isPrimaryButtonDisabled: () => getButtonIsDisabled(primaryButtonDataHook),
    getSelectedDaysLabel: () => getByDataHook('selected-days-label'),
    getPrimaryActionButtonLabel: () => getButtonLabel(primaryButtonDataHook),
    getSecondaryActionButtonLabel: () =>
      getButtonLabel(secondaryButtonDataHook),
    clickOnPrimaryButton: () => clickOnButton(primaryButtonDataHook),
    clickOnSecondaryButton: () => clickOnButton(secondaryButtonDataHook),
  };
};
