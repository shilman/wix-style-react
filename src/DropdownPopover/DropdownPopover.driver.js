import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { dropdownLayoutDriverFactory } from '../DropdownLayout/DropdownLayout.uni.driver';

// TODO: remove when implementation with UniDriver becomes possible
import { Simulate } from 'react-dom/test-utils';

export const dropdownPopoverDriverFactory = base => {
  const byDataHook = dataHook => base.$(`[data-hook="${dataHook}"]`);

  const getTargetElement = () => byDataHook('popover-element');
  const getContentElement = () => byDataHook('popover-content');

  const createDropdownLayoutDriver = () => dropdownLayoutDriverFactory(base);

  return {
    ...baseUniDriverFactory(base),

    /** Returns the native target element */
    clickTargetElement: () => getTargetElement().click(),

    /** Returns `true` if the dropdown is being shown */
    isDropdownShown: async () => await getContentElement().exists(),

    /** Select a specific option (requires the DropdownPopover to be opened) */
    selectOption: async index =>
      createDropdownLayoutDriver().clickAtOption(index),

    /** Click outside of the component */
    clickOutside: async () => {
      if (base.type === 'react') {
        document.dispatchEvent(new Event('mousedown'));
      }
    },

    /** Perform a mouseEnter on the component */
    mouseEnter: async () => {
      if (base.type === 'react') {
        Simulate.mouseEnter(await base.getNative());
      }
    },

    /** Perform a mouseLeave on the component */
    mouseLeave: async () => {
      if (base.type === 'react') {
        Simulate.mouseLeave(await base.getNative());
      }
    },
  };
};
