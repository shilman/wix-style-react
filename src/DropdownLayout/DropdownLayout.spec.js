import React from 'react';
import { consoleErrors } from 'wix-ui-test-utils/dist/src/jest-setup';
import DropdownLayout, { DIVIDER_OPTION_VALUE } from './DropdownLayout';
import dropdownLayoutDriverFactory from './DropdownLayout.driver';
import { createRendererWithDriver, cleanup } from '../../test/utils/react';

describe('DropdownLayout', () => {
  const render = createRendererWithDriver(dropdownLayoutDriverFactory);
  const createDriver = jsx => render(jsx).driver;
  afterEach(() => {
    cleanup();
  });
  const options = [
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3', disabled: true },
    { id: 3, value: 'Option 4' },
    { id: 'divider1', value: '-' },
    { id: 'element1', value: <span style={{ color: 'brown' }}>Option 4</span> },
    { value: '-' },
  ];

  it('should have be invisible and drop down by default', () => {
    const driver = createDriver(<DropdownLayout options={options} />);
    expect(driver.isShown()).toBeFalsy();
    expect(driver.isDown()).toBeTruthy();
  });

  it('should throw an error when trying to click on a non exists option', () => {
    const driver = createDriver(<DropdownLayout visible options={options} />);
    expect(() => driver.clickAtOption(20)).toThrow();
  });

  it('should focus on selected option', () => {
    const driver = createDriver(
      <DropdownLayout
        focusOnSelectedOption
        visible
        options={options}
        selectedId={3}
      />,
    );
    expect(driver.optionsScrollTop()).toBe(0);
  });

  it('should be visible and drop down', () => {
    const driver = createDriver(<DropdownLayout visible options={options} />);
    expect(driver.isShown()).toBeTruthy();
    expect(driver.isDown()).toBeTruthy();
  });

  it('should have all options values in dropdown list', () => {
    const _options = [
      { id: 0, value: 'Option 1' },
      { id: 1, value: 'Option 2' },
      { id: 2, value: 'Option 3' },
    ];
    const optionsContent = _options.map(option => option.value);
    const driver = createDriver(<DropdownLayout options={_options} />);
    expect(driver.optionsContent()).toEqual(optionsContent);
  });

  it('should hide dropdown on outside click', () => {
    const { driver, rerender } = render(
      <DropdownLayout
        onClickOutside={() =>
          rerender(<DropdownLayout visible={false} options={options} />)
        }
        visible
        options={options}
      />,
    );

    expect(driver.isShown()).toBeTruthy();

    driver.mouseClickOutside();

    expect(driver.isShown()).toBeFalsy();
  });

  it('should have a default tab index', () => {
    const driver = createDriver(<DropdownLayout visible options={options} />);
    expect(driver.tabIndex()).toBe(0);
  });

  it('should have options', () => {
    const driver = createDriver(<DropdownLayout visible options={options} />);
    expect(driver.optionsLength()).toBe(7);
    expect(driver.optionContentAt(0)).toBe('Option 1');
    expect(driver.isOptionADivider(4)).toBeTruthy();
    expect(
      driver.optionByHook('dropdown-divider-divider1').isDivider(),
    ).toBeTruthy();
    expect(driver.optionContentAt(5)).toBe('Option 4');

    expect(driver.isOptionADivider(6)).toBeTruthy();
    expect(driver.optionByHook('dropdown-divider-6').isDivider()).toBeTruthy();
  });

  it('should call onClose when esc key is pressed', () => {
    const onClose = jest.fn();
    const driver = createDriver(
      <DropdownLayout visible options={options} onClose={onClose} />,
    );
    driver.mouseEnterAtOption(0);
    driver.pressEscKey();
    expect(onClose).toBeCalled();
  });

  it('should click an option by value', () => {
    const onSelect = jest.fn();
    const driver = createDriver(
      <DropdownLayout visible options={options} onSelect={onSelect} />,
    );
    driver.clickAtOptionWithValue('Option 4');
    expect(onSelect).toBeCalledWith(options[3], false);
  });

  describe('onSelect', () => {
    describe('with selectedId', () => {
      it('should call onSelect with true value when clicking on a selected option', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout
            visible
            options={options}
            onSelect={onSelect}
            selectedId={0}
          />,
        );
        driver.clickAtOption(0);
        expect(onSelect).toBeCalledWith(options[0], true);
      });

      it('should call onSelect with false value when clicking on a selected option by hook', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout
            visible
            options={options}
            onSelect={onSelect}
            selectedId={0}
          />,
        );
        driver.optionByHook('dropdown-item-3').click();
        expect(onSelect).toBeCalledWith(options[3], false);
      });
    });

    describe('without selectedId', () => {
      it('should nofity a new option was selected for first selection', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout visible options={options} onSelect={onSelect} />,
        );
        driver.clickAtOption(0);
        expect(onSelect).toBeCalledWith(options[0], false);
      });

      it('should nofity a new option was selected after a value was previously selected', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout visible options={options} onSelect={onSelect} />,
        );
        driver.clickAtOption(0);
        driver.clickAtOption(1);
        expect(onSelect).toHaveBeenLastCalledWith(options[1], false);
      });

      it('should nofity the same option was selected', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout visible options={options} onSelect={onSelect} />,
        );
        driver.clickAtOption(0);
        driver.clickAtOption(0);
        expect(onSelect).toHaveBeenLastCalledWith(options[0], true);
      });
    });

    describe('keyboard events', () => {
      it('should call onSelect when enter key is pressed', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout visible options={options} onSelect={onSelect} />,
        );
        driver.pressDownKey();
        driver.pressEnterKey();
        expect(onSelect).toBeCalled();
      });

      it('should call onSelect when space key is pressed', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout visible options={options} onSelect={onSelect} />,
        );
        driver.pressDownKey();
        driver.pressSpaceKey();
        expect(onSelect).toBeCalled();
      });

      it('should call onSelect when tab key is pressed', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout visible options={options} onSelect={onSelect} />,
        );
        driver.pressDownKey();
        driver.pressTabKey();
        expect(onSelect).toBeCalled();
      });

      it('should not call onSelect when composing text via external means', () => {
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout visible options={options} onSelect={onSelect} />,
        );
        driver.pressEnterKey();
        expect(onSelect).not.toBeCalled();
      });
    });
  });

  it('should render a function option with the rendered item props', () => {
    const selectedId = 0;
    const unSelectedId = 1;

    const optionsWithFuncValues = [
      {
        id: 0,
        value: ({ selected }) => (
          <div>option {selected ? 'selected' : 'not selected'}</div>
        ),
      },
      {
        id: 1,
        value: ({ selected }) => (
          <div>option {selected ? 'selected' : 'not selected'}</div>
        ),
      },
    ];

    const driver = createDriver(
      <DropdownLayout
        visible
        options={optionsWithFuncValues}
        selectedId={selectedId}
      />,
    );

    expect(driver.optionContentAt(selectedId)).toEqual('option selected');
    expect(driver.optionContentAt(unSelectedId)).toEqual('option not selected');
  });

  it('should select the chosen value', () => {
    const selectedId = 0;
    const driver = createDriver(
      <DropdownLayout visible options={options} selectedId={selectedId} />,
    );
    expect(driver.isOptionSelected(0)).toBeTruthy();
    expect(driver.optionByHook('dropdown-item-0').isSelected()).toBeTruthy();
  });

  it('should remember the selected option when getting re-opened after got closed', () => {
    const selectedId = 1;
    const props = { visible: true, options, selectedId };
    const { driver, rerender } = render(<DropdownLayout {...props} />);
    expect(driver.isOptionSelected(selectedId)).toBeTruthy();
    rerender(<DropdownLayout {...props} visible={false} />);
    rerender(<DropdownLayout {...props} visible />);
    expect(driver.isOptionSelected(selectedId)).toBeTruthy();
  });

  it('should select the chosen value when overrideStyle is true', () => {
    const selectedId = 0;
    const _options = [{ id: 0, value: 'Option 1', overrideStyle: true }];
    const driver = createDriver(
      <DropdownLayout visible options={_options} selectedId={selectedId} />,
    );

    expect(driver.isOptionSelectedWithGlobalClassName(0)).toBeTruthy();
    expect(
      driver.optionByHook('dropdown-item-0').isSelectedWithGlobalClassName(),
    ).toBeTruthy();
  });

  it('should not contain pointer arrow without the withArrow property', () => {
    const driver = createDriver(<DropdownLayout visible options={options} />);
    expect(driver.hasTopArrow()).toBeFalsy();
  });

  it('should contain pointer arrow when withArrow property is true', () => {
    const driver = createDriver(
      <DropdownLayout visible withArrow options={options} />,
    );
    expect(driver.hasTopArrow()).toBeTruthy();
  });

  it('should support mouse events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const driver = createDriver(
      <DropdownLayout
        visible
        options={options}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />,
    );
    driver.mouseEnter();
    expect(onMouseEnter).toBeCalled();
    expect(onMouseLeave).not.toBeCalled();

    driver.mouseLeave();
    expect(onMouseLeave).toBeCalled();
  });

  describe('itemHeight prop', () => {
    it('should be small by default', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      expect(driver.isOptionHeightSmall(0)).toBe(true);
    });

    it('should be small', () => {
      const driver = createDriver(
        <DropdownLayout visible options={options} itemHeight="small" />,
      );
      expect(driver.isOptionHeightSmall(0)).toBe(true);
    });

    it('should be big', () => {
      const driver = createDriver(
        <DropdownLayout visible options={options} itemHeight="big" />,
      );
      expect(driver.isOptionHeightBig(0)).toBe(true);
    });
  });

  describe('selectedHighlight prop', () => {
    const selectedId = 0;

    it('should be true by default', () => {
      const driver = createDriver(
        <DropdownLayout visible options={options} selectedId={selectedId} />,
      );
      expect(driver.optionById(selectedId).isSelected()).toBe(true);
    });

    describe('when true', () => {
      it('should give the option a selected classname', () => {
        const driver = createDriver(
          <DropdownLayout
            selectedHighlight
            visible
            options={options}
            selectedId={selectedId}
          />,
        );
        expect(driver.optionById(selectedId).isSelected()).toBeTruthy();
      });
    });

    describe('when false', () => {
      it('should not give the option a selected classname', () => {
        const driver = createDriver(
          <DropdownLayout
            selectedHighlight={false}
            visible
            options={options}
            selectedId={selectedId}
          />,
        );
        expect(driver.optionById(selectedId).isSelected()).toBeFalsy();
      });
    });
  });

  describe('options that are links', () => {
    it('should not be link by default', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      expect(driver.isLinkOption(0)).toBe(false);
    });

    it('should be a link option', () => {
      const driver = createDriver(
        <DropdownLayout
          visible
          options={options.map(opt => ({ ...opt, linkTo: 'http://wix.com' }))}
        />,
      );
      expect(driver.isLinkOption(0)).toBe(true);
    });
  });

  describe('controlled and uncontrolled logic', () => {
    describe('controlled', () => {
      it('should work as a controlled component when selectedId an onSelect are given', () => {
        //give selectedId and onSelect
        const onSelect = jest.fn();
        const driver = createDriver(
          <DropdownLayout
            visible
            options={options}
            onSelect={onSelect}
            selectedId={0}
          />,
        );
        //select item
        driver.clickAtOption(1);
        //expect internal state to not change
        expect(driver.isOptionSelected(0)).toBeTruthy();
      });
    });

    describe('uncontrolled', () => {
      it('should work as an uncontrolled component when only selectedId is supplied', () => {
        //give selectedId
        const driver = createDriver(
          <DropdownLayout visible options={options} selectedId={0} />,
        );
        //select item
        driver.clickAtOption(1);
        //expect internal state to change
        expect(driver.isOptionSelected(1)).toBeTruthy();
      });

      it('should work as an uncontrolled component when only onSelect is supplied', () => {
        //give onSelect
        const driver = createDriver(
          <DropdownLayout visible options={options} onSelect={jest.fn()} />,
        );
        //select item
        driver.clickAtOption(1);
        //expect internal state to change
        expect(driver.isOptionSelected(1)).toBeTruthy();
      });
    });
  });

  describe('hover logic', () => {
    it('should not hover any option by default', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      expect(
        options.map((option, index) => driver.isOptionHovered(index)),
      ).not.toContain(true);
    });

    it('should hover starting from the top', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      driver.pressDownKey();
      expect(driver.isOptionHovered(0)).toBeTruthy();
    });

    it('should hover starting from the selected item', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      driver.clickAtOption(0);
      driver.pressDownKey();
      expect(driver.isOptionHovered(1)).toBeTruthy();
    });

    it('should hover when mouse enter and unhover when mouse leave', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      driver.mouseEnterAtOption(0);
      expect(driver.isOptionHovered(0)).toBeTruthy();
      driver.mouseLeaveAtOption(0);
      expect(driver.isOptionHovered(0)).toBeFalsy();
    });

    it('should hover when mouse enter and unhover when mouse leave by data hook', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      const option = driver.optionByHook('dropdown-item-0');
      option.mouseEnter();
      expect(option.isHovered()).toBeTruthy();
      option.mouseLeave();
      expect(option.isHovered()).toBeFalsy();
    });

    it('should hover when mouse enter and unhover when mouse leave when overrideStyle is true', () => {
      const _options = [{ id: 0, value: 'Option 1', overrideStyle: true }];

      const driver = createDriver(
        <DropdownLayout visible options={_options} />,
      );

      driver.mouseEnterAtOption(0);
      expect(driver.isOptionHoveredWithGlobalClassName(0)).toBeTruthy();
      expect(
        driver.optionByHook('dropdown-item-0').isHoveredWithGlobalClassName(),
      ).toBeTruthy();
      driver.mouseLeaveAtOption(0);
      expect(driver.isOptionHoveredWithGlobalClassName(0)).toBeFalsy();
      expect(
        driver.optionByHook('dropdown-item-0').isHoveredWithGlobalClassName(),
      ).toBeFalsy();
    });

    it('should not hover divider or a disabled item when mouse enter', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      driver.mouseEnterAtOption(2);
      expect(driver.isOptionHovered(2)).toBeFalsy();
      driver.mouseLeaveAtOption(4);
      expect(driver.isOptionHovered(4)).toBeFalsy();
    });

    it('should have only one hovered option', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      driver.mouseEnterAtOption(0);
      expect(driver.isOptionHovered(0)).toBeTruthy();
      driver.mouseEnterAtOption(1);
      expect(driver.isOptionHovered(0)).toBeFalsy();
      expect(driver.isOptionHovered(1)).toBeTruthy();
    });

    it('should hovered items cyclic and skipping divider or disabled items on down key', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      driver.pressDownKey();
      driver.pressDownKey();
      expect(driver.isOptionHovered(1)).toBeTruthy();
      driver.pressDownKey();
      expect(driver.isOptionHovered(3)).toBeTruthy();
      driver.pressDownKey();
      expect(driver.isOptionHovered(5)).toBeTruthy();
      driver.pressDownKey();
      expect(driver.isOptionHovered(0)).toBeTruthy();
    });

    it('should hovered items cyclic and skipping divider or disabled on up key', () => {
      const driver = createDriver(<DropdownLayout visible options={options} />);
      driver.pressUpKey();
      expect(driver.isOptionHovered(5)).toBeTruthy();
      driver.pressUpKey();
      expect(driver.isOptionHovered(3)).toBeTruthy();
      driver.pressUpKey();
      expect(driver.isOptionHovered(1)).toBeTruthy();
      driver.pressUpKey();
      expect(driver.isOptionHovered(0)).toBeTruthy();
    });

    it('should hover starting from a given item', () => {
      const _options = [
        { id: 10, value: 'Option 1' },
        { id: 20, value: 'Option 2' },
        { id: 30, value: 'Option 3' },
      ];
      const driver = createDriver(
        <DropdownLayout
          visible
          options={_options}
          selectedId={20}
          onSelect={jest.fn()}
        />,
      );
      driver.pressDownKey();
      expect(driver.isOptionHovered(2)).toBeTruthy();
    });

    it('should remember the hovered option when options change', () => {
      const _options = [
        { id: 0, value: 'a 1' },
        { id: 1, value: 'a 2' },
        { id: 2, value: 'a 3' },
        { id: 3, value: 'a 4' },
      ];

      const { driver, rerender } = render(
        <DropdownLayout visible options={_options} />,
      );
      driver.pressDownKey();
      driver.pressDownKey();
      driver.pressDownKey();
      driver.pressDownKey();

      expect(driver.isOptionHovered(3)).toBeTruthy();

      rerender(<DropdownLayout visible options={_options.slice(1)} />);

      expect(driver.isOptionHovered(2)).toBeTruthy();
    });

    it('should reset the hovered option when options change and hovered option does not exist anymore', () => {
      const initialOptions = [
        { id: 0, value: 'a 1' },
        { id: 1, value: 'a 2' },
        { id: 2, value: 'a 3' },
        { id: 3, value: 'a 4' },
      ];

      const { driver, rerender } = render(
        <DropdownLayout visible options={initialOptions} />,
      );
      driver.pressDownKey();
      driver.pressDownKey();

      expect(driver.isOptionHovered(1)).toBeTruthy();

      rerender(<DropdownLayout visible options={initialOptions.slice(2)} />);

      expect(driver.isOptionHovered(0)).toBeFalsy();
      expect(driver.isOptionHovered(1)).toBeFalsy();
    });
  });

  describe('theme support', () => {
    it('should allow setting a custom theme', () => {
      const props = { theme: 'material', options };
      const { driver } = render(<DropdownLayout {...props} />);
      expect(driver.hasTheme('material')).toBe(true);
    });
  });

  describe('option validator', () => {
    describe('valid', () => {
      it('option', () => {
        render(<DropdownLayout options={[{ id: '1', value: 'hello' }]} />);
        expect(consoleErrors.get()).toHaveLength(0);
      });
      it('option with function value', () => {
        render(<DropdownLayout options={[{ id: '1', value: () => {} }]} />);
        expect(consoleErrors.get()).toHaveLength(0);
      });
      it('divider', () => {
        render(<DropdownLayout options={[{ value: DIVIDER_OPTION_VALUE }]} />);
        expect(consoleErrors.get()).toHaveLength(0);
      });
    });

    describe('invalid', () => {
      it('no value', () => {
        render(<DropdownLayout options={[{ id: '1' }]} />);
        expect(consoleErrors.get()).toHaveLength(1);
        expect(consoleErrors.get()[0].includes('option.value')).toBeTruthy();

        consoleErrors.reset(); // prevent test from failing
      });

      it('no id and not divider', () => {
        render(<DropdownLayout options={[{ value: 'aaa' }]} />);
        expect(consoleErrors.get()).toHaveLength(1);
        expect(consoleErrors.get()[0].includes('option.id')).toBeTruthy();

        consoleErrors.reset(); // prevent test from failing
      });

      it('empty trimmed id', () => {
        render(<DropdownLayout options={[{ id: '   ', value: 'hello' }]} />);
        expect(consoleErrors.get()).toHaveLength(1);
        expect(consoleErrors.get()[0].includes('option.id')).toBeTruthy();

        consoleErrors.reset(); // prevent test from failing
      });

      it('empty trimmed value', () => {
        render(<DropdownLayout options={[{ id: '1', value: '  ' }]} />);
        expect(consoleErrors.get()).toHaveLength(1);
        expect(consoleErrors.get()[0].includes('option.value')).toBeTruthy();

        consoleErrors.reset(); // prevent test from failing
      });
    });
  });
});
