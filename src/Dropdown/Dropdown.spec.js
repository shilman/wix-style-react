import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import dropdownDriverFactory from './Dropdown.driver';
import Dropdown, { UPGRADE_PROP_NAME } from './Dropdown';
import { dropdownTestkitFactory } from '../../testkit';
import { dropdownTestkitFactory as enzymeDropdownTestkitFactory } from '../../testkit/enzyme';
import { mount } from 'enzyme';
import { sleep } from 'wix-ui-test-utils/react-helpers';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';

describe('Dropdown', () => {
  const render = createRendererWithDriver(dropdownDriverFactory);
  const createDriver = jsx => render(jsx).driver;

  const getOptions = () => [
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3', disabled: true },
    { id: 3, value: 'Option 4' },
    { id: 'divider1', value: '-' },
    { id: 'element1', value: <span style={{ color: 'brown' }}>Option 4</span> },
  ];

  afterEach(() => {
    cleanup();
  });

  it('should select item with selectedId on init state', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <Dropdown options={getOptions()} selectedId={0} />,
    );

    expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
    expect(inputDriver.getValue()).toBe('Option 1');
  });

  it('should select an item when clicked', () => {
    const { driver, dropdownLayoutDriver } = createDriver(
      <Dropdown options={getOptions()} />,
    );
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
  });

  it('should enter the selected option text when selected', () => {
    const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
      <Dropdown options={getOptions()} />,
    );
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(inputDriver.getValue()).toBe('Option 1');
  });

  it('should update text when selected option changes', () => {
    const options = getOptions();
    const dataHook = 'dropdown-comp';

    const { driver: dropdownDriver, rerender } = render(
      <Dropdown dataHook={dataHook} options={options} selectedId={0} />,
    );
    const { driver, inputDriver, dropdownLayoutDriver } = dropdownDriver;

    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(inputDriver.getValue()).toBe('Option 1');

    options[0].value = 'Updated';
    rerender(<Dropdown dataHook={dataHook} options={options} selectedId={0} />);

    expect(inputDriver.getValue()).toBe('Updated');
  });

  it('should close when clicking on input (header)', () => {
    const { dropdownLayoutDriver, inputDriver } = createDriver(
      <Dropdown options={getOptions()} />,
    );
    inputDriver.click();
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();

    return sleep(200).then(() => {
      inputDriver.click();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });
  });

  it('should be read only', () => {
    const { driver } = createDriver(<Dropdown options={getOptions()} />);
    expect(driver.isReadOnly()).toBeTruthy();
  });

  describe('Upgrade', () => {
    const NewDropdown = props => <Dropdown {...props} upgrade />;

    describe('Uncontrolled SelectedId', () => {
      it('should select item with selectedId on init state', () => {
        const { inputDriver, dropdownLayoutDriver } = createDriver(
          <NewDropdown options={getOptions()} initiallySelectedId={0} />,
        );

        expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
        expect(inputDriver.getValue()).toBe('Option 1');
      });

      it('should select an item when clicked', () => {
        const { driver, dropdownLayoutDriver } = createDriver(
          <NewDropdown options={getOptions()} />,
        );
        driver.focus();
        dropdownLayoutDriver.clickAtOption(0);
        expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
      });

      it('should enter the selected option text when selected', () => {
        const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
          <NewDropdown options={getOptions()} />,
        );
        driver.focus();
        dropdownLayoutDriver.clickAtOption(0);
        expect(inputDriver.getValue()).toBe('Option 1');
      });

      it('should close when clicking on input (header)', () => {
        const { dropdownLayoutDriver, inputDriver } = createDriver(
          <NewDropdown options={getOptions()} />,
        );
        inputDriver.click();
        expect(dropdownLayoutDriver.isShown()).toBeTruthy();

        return sleep(200).then(() => {
          inputDriver.click();
          expect(dropdownLayoutDriver.isShown()).toBeFalsy();
        });
      });

      it('should be read only', () => {
        const { driver } = createDriver(<NewDropdown options={getOptions()} />);
        expect(driver.isReadOnly()).toBeTruthy();
      });

      describe('initiallySelected', () => {
        it('should keep selectedId and value when initiallySelectedId changed', () => {
          const { driver: _driver, rerender } = render(
            <NewDropdown options={getOptions()} initiallySelectedId={0} />,
          );
          const { dropdownLayoutDriver } = _driver;
          expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
          rerender(
            <NewDropdown options={getOptions()} initiallySelectedId={1} />,
          );
          expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
        });
      });

      it(`should update selectedId when options change and id doesn't exist anymore`, () => {
        const { driver: _driver, rerender } = render(
          <NewDropdown
            options={[
              { id: 0, value: 'Option 1' },
              { id: 1, value: 'Option 2' },
            ]}
            initiallySelectedId={0}
          />,
        );
        const { inputDriver, dropdownLayoutDriver } = _driver;

        expect(dropdownLayoutDriver.optionById(0).isSelected()).toBeTruthy();
        expect(inputDriver.getValue()).toBe('Option 1');
        rerender(<NewDropdown options={[{ id: 1, value: 'Option 2' }]} />);

        expect(
          dropdownLayoutDriver
            .optionDrivers()
            .some(option => option.isSelected()),
        ).toBeFalsy();
        expect(inputDriver.getValue()).toBe('');
      });

      describe('PropTypes Validation', () => {
        let consoleErrorSpy;

        beforeEach(() => {
          consoleErrorSpy = jest
            .spyOn(global.console, 'error')
            .mockImplementation(jest.fn());
        });
        afterEach(() => {
          consoleErrorSpy.mockRestore();
        });

        it('should log error when selectedId and initiallySelectedId are used together', () => {
          render(
            <NewDropdown
              options={getOptions()}
              selectedId={0}
              initiallySelectedId={0}
            />,
          );
          expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
          expect(consoleErrorSpy).toBeCalledWith(
            expect.stringContaining(
              `'selectedId' and 'initiallySelectedId' cannot both be used at the same time.`,
            ),
          );
        });

        it('should log error when initiallySelectedId is used without upgrade', () => {
          render(<Dropdown options={getOptions()} initiallySelectedId={0} />);
          expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
          expect(consoleErrorSpy).toBeCalledWith(
            expect.stringContaining(
              `'initiallySelectedId' can be used only if you pass '${UPGRADE_PROP_NAME}=true' as well.`,
            ),
          );
        });
      });
    });

    describe('Controlled SelectedId', () => {
      it('should keep current selection and value when option clicked', () => {
        const { driver, dropdownLayoutDriver, inputDriver } = createDriver(
          <NewDropdown options={getOptions()} selectedId={0} />,
        );

        driver.focus();
        dropdownLayoutDriver.clickAtOption(1);

        expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
        expect(inputDriver.getValue()).toBe('Option 1');
      });

      it('should have no selection if selectedId does not exist', () => {
        const { dropdownLayoutDriver } = createDriver(
          <NewDropdown
            options={[{ id: 0, value: 'Option 1' }]}
            selectedId={99}
          />,
        );

        expect(dropdownLayoutDriver.optionById(0).isSelected()).toBeFalsy();
      });

      it('should update selection and value when selectedId changes', () => {
        const { driver: _driver, rerender } = render(
          <NewDropdown options={getOptions()} selectedId={0} />,
        );
        const { dropdownLayoutDriver, inputDriver } = _driver;

        expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
        expect(inputDriver.getValue()).toBe('Option 1');

        rerender(<NewDropdown options={getOptions()} selectedId={1} />);

        expect(dropdownLayoutDriver.isOptionSelected(1)).toBeTruthy();
        expect(inputDriver.getValue()).toBe('Option 2');
      });
    });

    describe('Rerender', () => {
      it('should keep value when unrelated prop updates', () => {
        const { driver: _driver, rerender } = render(
          <NewDropdown options={getOptions()} />,
        );
        const { inputDriver } = _driver;

        inputDriver.enterText('foo');
        expect(inputDriver.getValue()).toBe('foo');
        rerender(<NewDropdown options={getOptions()} status="error" />);

        expect(inputDriver.getValue()).toBe('foo');
      });
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(
        ReactTestUtils.renderIntoDocument(
          <div>
            <Dropdown dataHook={dataHook} />
          </div>,
        ),
      );
      const dropdownTestkit = dropdownTestkitFactory({ wrapper, dataHook });
      expect(dropdownTestkit.driver.exists()).toBeTruthy();
      expect(dropdownTestkit.inputDriver.exists()).toBeTruthy();
      expect(dropdownTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Dropdown dataHook={dataHook} />);
      const dropdownTestkit = enzymeDropdownTestkitFactory({
        wrapper,
        dataHook,
      });
      expect(dropdownTestkit.driver.exists()).toBeTruthy();
      expect(dropdownTestkit.inputDriver.exists()).toBeTruthy();
      expect(dropdownTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });
});
