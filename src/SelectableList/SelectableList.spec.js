import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import SelectableList from './SelectableList';
import { selectableListPrivateDriverFactory } from './SelectableList.driver.private';

import Checkbox from '../Checkbox';
import { checkboxTestkitFactory } from '../../testkit';

describe('SelectableList', () => {
  const createDriver = createUniDriverFactory(
    selectableListPrivateDriverFactory,
  );

  it('should render', async () => {
    const driver = createDriver(<SelectableList />);
    expect(await driver.exists()).toBeTruthy();
  });

  it('should render multiple children', async () => {
    const driver = createDriver(
      <SelectableList>
        <Checkbox />
        <Checkbox />
        <Checkbox />
      </SelectableList>,
    );
    expect(await driver.exists()).toBeTruthy();
  });

  it('`onSelect` should return selected component', async () => {
    const dataHook = 'clicked-checkbox';

    const mockOnSelect = jest.fn();

    const driver = createDriver(
      <SelectableList onSelect={mockOnSelect} selectTrigger="checked">
        <Checkbox />
        <Checkbox />
        <Checkbox dataHook={dataHook} />
      </SelectableList>,
    );

    const element = await driver.element();

    const checkboxDriver = checkboxTestkitFactory({
      wrapper: element,
      dataHook: dataHook,
    });

    await checkboxDriver.click();

    const mockCallback = mockOnSelect.mock.calls[0][0];

    expect(mockCallback.props.dataHook).toBe(dataHook);
  });

  it('`onDeselect` should return unSelected component', async () => {
    const dataHook = 'clicked-checkbox';

    const mockOnSelect = jest.fn();
    const mockOnDeselect = jest.fn();

    const driver = createDriver(
      <SelectableList
        onSelect={mockOnSelect}
        onDeselect={mockOnDeselect}
        selectTrigger="checked"
      >
        <Checkbox />
        <Checkbox />
        <Checkbox dataHook={dataHook} />
      </SelectableList>,
    );

    const element = await driver.element();

    const checkboxDriver = checkboxTestkitFactory({
      wrapper: element,
      dataHook: dataHook,
    });

    checkboxDriver.click();
    checkboxDriver.click();

    const mockDeselectCallback = mockOnDeselect.mock.calls[0][0];

    expect(mockDeselectCallback.props.dataHook).toBe(dataHook);
  });
});
