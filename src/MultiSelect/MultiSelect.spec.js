import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import multiSelectDriverFactory from './MultiSelect.driver';
import MultiSelect from './MultiSelect';
import { multiSelectTestkitFactory } from '../../testkit';
import { multiSelectTestkitFactory as enzymeMultiSelectTestkitFactory } from '../../testkit/enzyme';
import { mount } from 'enzyme';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';
import { depLogger } from '../utils/deprecationLog';

describe('MultiSelect', () => {
  const render = createRendererWithDriver(multiSelectDriverFactory);
  const createDriver = jsx => render(jsx).driver;
  const expectEventTargetValue = value =>
    expect.objectContaining({
      target: expect.objectContaining({ value }),
    });

  const options = [
    { value: 'Alabama', id: 'Alabama', tag: { label: 'Alabama' } },
    { value: 'Alaska', id: 'Alaska' },
    { value: 'Arkansas', id: 'Arkansas', tag: { label: 'Arkansas' } },
    { value: 'Arkansas', id: 'Arkansas' },
    { value: 'California', id: 'California' },
    { value: 'California2', id: 'California2' },
    { value: 'California3', id: 'California3' },
    { value: 'California4', id: 'California4' },
    { value: 'California5', id: 'California5' },
    { value: 'California6', id: 'California6' },
    { value: 'California7', id: 'California7' },
    { value: 'Two words', id: 'Two words' },
  ];

  afterEach(() => {
    cleanup();
  });

  const NewMultiSelect = props => <MultiSelect {...props} upgrade />;

  class ControlledMultiSelect extends React.Component {
    state = { inputValue: '' };

    render() {
      return (
        <NewMultiSelect
          {...this.props}
          onChange={e => {
            this.setState({ inputValue: e.target.value });
          }}
          value={this.state.inputValue}
        />
      );
    }
  }

  it('should NOT show dropdown when autofocus is on', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <NewMultiSelect options={options} autoFocus />,
    );
    expect(inputDriver.isFocus()).toBeTruthy();
    expect(dropdownLayoutDriver.isShown()).toBeFalsy();
  });

  it('should remove options that were selected and became tags', () => {
    const tags = [{ id: 'Alabama', label: 'Alabama' }];

    const { driver: multiSelectDriver, rerender } = render(
      <NewMultiSelect options={options} autoFocus />,
    );
    const { dropdownLayoutDriver } = multiSelectDriver;
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length);
    expect(dropdownLayoutDriver.isOptionExists('Alabama')).toBeTruthy();

    rerender(<NewMultiSelect options={options} tags={tags} autoFocus />);
    expect(dropdownLayoutDriver.optionsLength()).toBe(
      options.length - tags.length,
    );
    expect(dropdownLayoutDriver.isOptionExists('Alabama')).toBeFalsy();
  });

  it('should not filter anything without predicate function', () => {
    const onSelect = jest.fn();
    const { driver, dropdownLayoutDriver } = createDriver(
      <NewMultiSelect options={options} onSelect={onSelect} />,
    );
    driver.focus();
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length);
  });

  it('should not lose Focus or close the list on selection with a mouse click', () => {
    const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
      <NewMultiSelect options={options} />,
    );
    driver.pressKey('ArrowDown');
    dropdownLayoutDriver.clickAtOption(0);
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    expect(inputDriver.isFocus());
  });

  it('should not lose Focus or close the list on selection with enter press', () => {
    const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
      <NewMultiSelect options={options} />,
    );
    driver.focus();
    driver.pressKey('ArrowDown');
    driver.pressKey('Enter');
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    expect(inputDriver.isFocus()).toBeTruthy();
  });

  it('should not lose Focus or close the list on selection with tab press', () => {
    const onSelect = jest.fn();
    const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
      <NewMultiSelect options={options} onSelect={onSelect} />,
    );
    driver.pressKey('ArrowDown');
    driver.pressKey('ArrowDown');
    driver.pressKey('Tab');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();
    expect(inputDriver.isFocus()).toBeTruthy();
  });

  // Disabled since in order to support this in new API, we better add ability for Dropdownlayout to accept custom "select" keys.
  // We can also consider removing this feature (Ben?)
  xdescribe('Select with delimiter', () => {
    it('should select option when comma press', () => {
      const onSelect = jest.fn();
      const onChange = jest.fn();
      const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
        <NewMultiSelect
          value={options[0].value}
          options={options}
          delimiters={[',']}
          onSelect={onSelect}
          onChange={onChange}
        />,
      );
      driver.pressKey('ArrowDown');
      inputDriver.trigger('keyDown', { key: ',' });
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onChange).toBeCalledWith({ target: { value: '' } });
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      expect(inputDriver.isFocus()).toBeTruthy();
    });

    it('should select option when custom delimiters pressed', () => {
      const onSelect = jest.fn();
      const onChange = jest.fn();
      const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
        <NewMultiSelect
          value={options[0].value}
          options={options}
          delimiters={[';']}
          onSelect={onSelect}
          onChange={onChange}
        />,
      );
      driver.pressKey('ArrowDown');
      inputDriver.trigger('keyDown', { key: ';' });
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toBeCalledWith(options[0]);
      expect(onChange).toBeCalledWith({ target: { value: '' } });
      expect(dropdownLayoutDriver.isShown()).toBeTruthy();
      expect(inputDriver.isFocus()).toBeTruthy();
    });
  });

  describe('click-outside', () => {
    it('should clear input when clicked-out-side given input is non-empty', () => {
      const onChange = jest.fn();
      const { driver, inputDriver } = createDriver(
        <NewMultiSelect value={''} onChange={onChange} />,
      );
      inputDriver.focus('ArrowDown');
      inputDriver.enterText('foo');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toBeCalledWith(expectEventTargetValue('foo'));
      onChange.mockReset();

      driver.outsideClick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toBeCalledWith(expectEventTargetValue(''));
    });

    it('should NOT select option when clicked-out-side given option is marked', () => {
      const onSelect = jest.fn();

      const { driver, dropdownLayoutDriver } = createDriver(
        <ControlledMultiSelect options={options} onSelect={onSelect} />,
      );
      driver.pressKey('ArrowDown');
      driver.pressKey('ArrowDown');
      expect(dropdownLayoutDriver.isOptionHovered(0)).toBeTruthy();
      driver.outsideClick();
      expect(onSelect).toHaveBeenCalledTimes(0);
    });
  });

  it('should display a placeholder if there are no tags', () => {
    const placeholder = 'myPlaceholder';
    const { inputDriver } = createDriver(
      <NewMultiSelect options={options} placeholder={placeholder} />,
    );
    expect(inputDriver.getPlaceholder()).toBe(placeholder);
  });

  it('should render readonly input on select mode', () => {
    const { inputDriver } = createDriver(
      <NewMultiSelect options={options} mode="select" />,
    );
    expect(inputDriver.getReadOnly()).toBeTruthy();
  });

  it('should render arrow on select mode', () => {
    const { inputDriver } = createDriver(
      <NewMultiSelect options={options} mode="select" />,
    );
    expect(inputDriver.hasMenuArrow()).toBeTruthy();
  });

  it('should render input wrapper with error', () => {
    const { driver } = createDriver(<NewMultiSelect error options={options} />);
    expect(driver.inputWrapperHasError()).toBeTruthy();
  });

  it('should not display a placeholder if there are any tags', () => {
    const tags = [{ id: 'Alabama', label: 'Alabama' }];
    const placeholder = 'myPlaceholder';
    const { inputDriver } = createDriver(
      <NewMultiSelect
        options={options}
        tags={tags}
        placeholder={placeholder}
      />,
    );
    expect(inputDriver.getPlaceholder()).toBe('');
  });

  it('should focus the input when clicking on the input wrapper', () => {
    const { driver, inputDriver } = createDriver(
      <NewMultiSelect options={options} />,
    );
    expect(inputDriver.isFocus()).toBeFalsy();
    driver.clickOnInputWrapper();
    expect(inputDriver.isFocus()).toBeTruthy();
  });

  it('should check that wrapper has focus when the input element does', () => {
    const { driver, inputDriver } = createDriver(
      <NewMultiSelect options={options} />,
    );
    driver.clickOnInputWrapper();
    expect(inputDriver.isFocus()).toBeTruthy();
    expect(driver.inputWrapperHasFocus()).toBeTruthy();
  });

  it('should contain specific tags', () => {
    const tags = [
      { id: 'Alabama', label: 'Alabama' },
      { id: 'Alaska', label: 'Alaska' },
    ];

    const { driver } = createDriver(
      <NewMultiSelect options={options} tags={tags} />,
    );
    expect(driver.numberOfTags()).toBe(tags.length);
    expect(driver.getTagLabelAt(0)).toBe('Alabama');
    expect(driver.getTagLabelAt(1)).toBe('Alaska');
  });

  describe('onTagsAdded', () => {
    it('should have deprecationLog when onManuallyInput is also passed', () => {
      const depLogSpy = jest.spyOn(depLogger, 'log');
      render(<NewMultiSelect options={options} onManuallyInput={() => {}} />);
      expect(depLogSpy).toBeCalledWith(
        `When 'upgrade' is passed then 'onManuallyInput' will not be called. Please remove the 'onManuallyInput' prop.`,
      );
      depLogSpy.mockRestore();
    });

    describe('type&submit', () => {
      describe('input is empty', () => {
        it('should not be called when Enter is pressed', () => {
          const onManuallyInput = jest.fn();
          const onTagsAdded = jest.fn();
          const { driver } = createDriver(
            <ControlledMultiSelect
              options={options}
              onManuallyInput={onManuallyInput}
              onTagsAdded={onTagsAdded}
            />,
          );

          driver.focus();
          driver.pressKey('Enter');

          expect(onManuallyInput).toHaveBeenCalledTimes(0);
          expect(onTagsAdded).toHaveBeenCalledTimes(0);
        });
      });

      describe('input is not empty', () => {
        function testCase({
          props,
          keyPressed,
          enteredText = 'custom value',
          Component = NewMultiSelect,
          expectOnTagsAddedToBeCalled = true,
        }) {
          const onManuallyInput = jest.fn();
          const onSelect = jest.fn();
          const onTagsAdded = jest.fn();
          const { driver, inputDriver } = createDriver(
            <Component
              onManuallyInput={onManuallyInput}
              onTagsAdded={onTagsAdded}
              onSelect={onSelect}
              {...props}
            />,
          );

          driver.focus();
          inputDriver.enterText(enteredText);
          driver.pressKey(keyPressed);

          expect(onManuallyInput).toHaveBeenCalledTimes(0);
          expect(onSelect).toHaveBeenCalledTimes(0);
          expect(onTagsAdded).toHaveBeenCalledTimes(
            expectOnTagsAddedToBeCalled ? 1 : 0,
          );
          expectOnTagsAddedToBeCalled &&
            expect(onTagsAdded).toBeCalledWith([enteredText]);
        }

        it('should be called when Enter is pressed', () => {
          testCase({ props: { options }, keyPressed: 'Enter' });
        });

        it('should be called when Enter is pressed given ControlledMultiSelect', () => {
          testCase({
            props: { options },
            keyPressed: 'Enter',
            Component: ControlledMultiSelect,
          });
        });

        it('should be called when delimiter is pressed', () => {
          testCase({ props: { options }, keyPressed: ',' });
        });

        it('should be called when delimiter is pressed given no options', () => {
          testCase({ props: {}, keyPressed: ',' });
        });

        it('should NOT be called when Enter pressed given enteredText is spaces only', () => {
          testCase({
            props: { options },
            enteredText: '   ',
            keyPressed: 'Enter',
            expectOnTagsAddedToBeCalled: false,
          });
        });

        it('should NOT be called when Enter pressed given enteredText is delimited spaces only', () => {
          testCase({
            props: { options },
            enteredText: ' ,  ',
            keyPressed: 'Enter',
            expectOnTagsAddedToBeCalled: false,
          });
        });
      });
    });

    describe('Paste', () => {
      function testCase({ props, pasteValue, expectedOnTagsAddedArg }) {
        const onManuallyInput = jest.fn();
        const onSelect = jest.fn();
        const onTagsAdded = jest.fn();
        const { driver, inputDriver } = createDriver(
          <NewMultiSelect
            options={options}
            onSelect={onSelect}
            onTagsAdded={onTagsAdded}
            onManuallyInput={onManuallyInput}
            {...props}
          />,
        );
        driver.focus();
        inputDriver.trigger('paste');
        inputDriver.enterText(pasteValue);

        expect(onManuallyInput).toHaveBeenCalledTimes(0);
        expect(onSelect).toHaveBeenCalledTimes(0);
        expect(onTagsAdded).toHaveBeenCalledTimes(1);
        expect(onTagsAdded).toBeCalledWith(expectedOnTagsAddedArg);
      }

      it('should be called with single value when pasting a single custom value', () => {
        testCase({
          pasteValue: 'custom value',
          expectedOnTagsAddedArg: ['custom value'],
        });
      });

      it('should be called with multiple values with pasting comma-delimited value (default delimiter)', () => {
        testCase({
          pasteValue: 'value1,value2',
          expectedOnTagsAddedArg: ['value1', 'value2'],
        });
      });

      it('should be called with multiple values with pasting colon-delimited value (custom delimiter)', () => {
        testCase({
          props: { delimiters: [':'] },
          pasteValue: 'value1:value2',
          expectedOnTagsAddedArg: ['value1', 'value2'],
        });
      });

      it('should be called with multiple values with pasting mixed delimited value (custom delimiters)', () => {
        testCase({
          props: { delimiters: [':', ';'] },
          pasteValue: 'value1:value2;value3',
          expectedOnTagsAddedArg: ['value1', 'value2', 'value3'],
        });
      });

      it('should be called with trimmed values', () => {
        testCase({
          pasteValue: ' value1 , value2 ',
          expectedOnTagsAddedArg: ['value1', 'value2'],
        });
      });
    });
  });

  describe('onSelect', () => {
    it('should be called when option clicked', () => {
      const onSelect = jest.fn();
      const onManuallyInput = jest.fn();

      const { driver, dropdownLayoutDriver } = createDriver(
        <NewMultiSelect options={options} onSelect={onSelect} />,
      );
      driver.pressKey('ArrowDown');
      dropdownLayoutDriver.clickAtOption(0);

      expect(onManuallyInput).toHaveBeenCalledTimes(0);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should be called with selected option given highlight enabled', () => {
      // This is a regression test for old bug , when highlight enabled the value would be a <Highlight> element
      const onSelect = jest.fn();
      const option1 = {
        id: '1',
        value: 'alabama',
        arbitraryPropName: { code: 'ALB' },
      };
      const { driver, dropdownLayoutDriver } = createDriver(
        <NewMultiSelect options={[option1]} onSelect={onSelect} />,
      );
      driver.pressKey('ArrowDown');
      dropdownLayoutDriver.clickAtOption(0);

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toBeCalledWith(option1);
    });

    it('should be called with selected option given highlight disabled', () => {
      const onSelect = jest.fn();
      const option1 = {
        id: '1',
        value: 'alabama',
        arbitraryPropName: { code: 'ALB' },
      };
      const { driver, dropdownLayoutDriver } = createDriver(
        <NewMultiSelect
          options={[option1]}
          onSelect={onSelect}
          highlight={false}
        />,
      );
      driver.pressKey('ArrowDown');
      dropdownLayoutDriver.clickAtOption(0);

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toBeCalledWith(option1);
    });

    it('should be called when option is selected by keyboard', () => {
      const onSelect = jest.fn();

      const { driver } = createDriver(
        <NewMultiSelect options={options} onSelect={onSelect} />,
      );
      driver.pressKey('ArrowDown');
      driver.pressKey('ArrowDown');
      driver.pressKey('Enter');

      expect(onSelect).toHaveBeenCalledTimes(1);
      // TODO: add expect(onSelect).toBeCalledWith(...)
    });
  });

  describe('onKeyDown', () => {
    it('should be called once when character key pressed', () => {
      const onKeyDown = jest.fn();
      const { driver, inputDriver } = createDriver(
        <NewMultiSelect options={options} onKeyDown={onKeyDown} />,
      );

      driver.focus();
      inputDriver.keyDown('a');
      expect(onKeyDown.mock.calls).toHaveLength(1);
    });
  });

  it('should call onRemoveTag when removing tags', () => {
    const tagId = 'SweetHome';
    const tags = [{ id: tagId, label: 'Alabama' }];
    const onRemoveTag = jest.fn();
    const { driver } = createDriver(
      <NewMultiSelect autoFocus tags={tags} onRemoveTag={onRemoveTag} />,
    );

    const tagDriver = driver.getTagDriverByTagId(tagId);
    tagDriver.removeTag();

    expect(onRemoveTag).toHaveBeenCalledWith(tagId);
  });

  it('should set maxHeight to initial when no height limit introduced', () => {
    const { driver } = createDriver(<NewMultiSelect options={options} />);

    expect(driver.getMaxHeight()).toBe('initial');
  });

  it('should set maxHeight when maxNumRows defined', () => {
    const { driver } = createDriver(
      <NewMultiSelect maxNumRows={2} options={options} />,
    );

    expect(driver.getMaxHeight()).toBe('70px');
  });

  it('should set maxHeight when maxNumRows defined (large tags)', () => {
    const _options = [
      { value: 'Alaska', id: 'Alaska', label: 'Alaska', size: 'large' },
    ];

    const { driver } = createDriver(
      <NewMultiSelect maxNumRows={2} tags={_options} options={_options} />,
    );

    expect(driver.getMaxHeight()).toBe('94px');
  });

  // TODO: dnd testkit is missing - once it's available, this test has to be completed and run
  xit('should allow reordering the tags', () => {
    const tags = [
      { label: 'Alabama', id: 'Alabama' },
      { label: 'California2', id: 'California2' },
      { label: 'California3', id: 'California3' },
      { label: 'California4', id: 'California4' },
    ];
    const onReorder = jest.fn();
    const {
      driver: { getTagLabelAt, getTagDriverByTagId },
    } = createDriver(
      <NewMultiSelect
        draggable
        options={options}
        tags={tags}
        onReorder={onReorder}
        autoFocus
      />,
    );
    getTagDriverByTagId('Alabama').dragTo(
      getTagDriverByTagId('California3').element,
    );
    expect(onReorder).toBeCalledWith({ removedIndex: 0, addedIndex: 2 });

    expect(getTagLabelAt(0)).toBe('California3');
    expect(getTagLabelAt(2)).toBe('Alabama');
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const tags = [{ id: 'Alabama', label: 'Alabama' }];
      const wrapper = div.appendChild(
        ReactTestUtils.renderIntoDocument(
          <div>
            <NewMultiSelect dataHook={dataHook} tags={tags} />
          </div>,
        ),
      );
      const multiSelectTestkit = multiSelectTestkitFactory({
        wrapper,
        dataHook,
      });
      expect(multiSelectTestkit.driver.exists()).toBeTruthy();
      expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      expect(
        multiSelectTestkit.driver.getTagDriverByTagId('Alabama').exists(),
      ).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const tags = [{ id: 'Alabama', label: 'Alabama' }];
      const wrapper = mount(<NewMultiSelect dataHook={dataHook} tags={tags} />);
      const multiSelectTestkit = enzymeMultiSelectTestkitFactory({
        wrapper,
        dataHook,
      });
      expect(multiSelectTestkit.driver.exists()).toBeTruthy();
      expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      expect(
        multiSelectTestkit.driver.getTagDriverByTagId('Alabama').exists(),
      ).toBeTruthy();
    });
  });
});
