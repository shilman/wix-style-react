import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const selectableListDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    getChild: query => base.$(query),
  };
};
