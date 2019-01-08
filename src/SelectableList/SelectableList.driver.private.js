import { selectableListDriverFactory as publicDriverFactory } from './SelectableList.driver';

export const selectableListPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
