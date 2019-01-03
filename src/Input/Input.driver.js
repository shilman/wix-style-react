import ReactTestUtils from 'react-dom/test-utils';
import styles from './Input.scss';

const inputDriverFactory = ({ element }) => {
  const input = element && element.querySelector('input');
  const clearButton =
    element && element.querySelector(`[data-hook=input-clear-button]`);
  const suffixNode = element && element.querySelector(`.${styles.suffix}`);
  const unitNode = element && element.querySelector(`.${styles.unit}`);
  const magnifyingGlassNode =
    element && element.querySelector(`.${styles.magnifyingGlass}`);
  const menuArrowNode =
    element && element.querySelector(`.${styles.menuArrow}`);
  const getName = () => input.getAttribute('name');
  const getType = () => input.getAttribute('type');

  const driver = {
    trigger: (trigger, event) => ReactTestUtils.Simulate[trigger](input, event),
    focus: options => {
      input.focus(options);
      ReactTestUtils.Simulate.focus(input);
    },
    blur: () => {
      input.blur();
      ReactTestUtils.Simulate.blur(input);
    },
    getName,
    getType,
    keyDown: key => ReactTestUtils.Simulate.keyDown(input, { key }),
    click: () => ReactTestUtils.Simulate.click(input),
    clickSuffix: () => ReactTestUtils.Simulate.click(suffixNode),
    clickClear: () => ReactTestUtils.Simulate.click(clearButton),
    clickUnit: () => ReactTestUtils.Simulate.click(unitNode),
    clickMagnifyingGlass: () =>
      ReactTestUtils.Simulate.click(magnifyingGlassNode),
    clickMenuArrow: () => ReactTestUtils.Simulate.click(menuArrowNode),
    mouseOver: () => ReactTestUtils.Simulate.mouseOver(input),
    mouseOut: () => ReactTestUtils.Simulate.mouseOut(input),
    clearText: () => driver.enterText(''),
    enterText: text => {
      input.value = text;
      ReactTestUtils.Simulate.change(input, {
        target: { name: getName(), type: getType(), value: text },
      });
    },
    getValue: () => input.value,
    getPlaceholder: () => input.placeholder,
    getDefaultValue: () => input.defaultValue,
    getTabIndex: () => input.tabIndex,
    getReadOnly: () => input.readOnly,
    getTextOverflow: () => input.style['text-overflow'],
    getAriaLabel: () => input.getAttribute('aria-label'),
    getAriaControls: () => input.getAttribute('aria-controls'),
    getAriaDescribedby: () => input.getAttribute('aria-describedby'),
    getAutocomplete: () => input.getAttribute('autocomplete'),
    getRequired: () => input.required,
    hasPrefix: () => element.querySelectorAll(`.${styles.prefix}`).length === 1,
    hasPrefixClass: () =>
      element.querySelectorAll(`.${styles.input}.${styles.withPrefix}`)
        .length === 1,
    hasSuffix: () => !!suffixNode,
    hasSuffixClass: () =>
      element.querySelectorAll(`.${styles.input}.${styles.withSuffix}`)
        .length === 1,
    hasSuffixesClass: () =>
      element.querySelectorAll(`.${styles.input}.${styles.withSuffixes}`)
        .length === 1,
    prefixComponentExists: style =>
      !!element.querySelector(`.${styles.prefix} ${style}`),
    suffixComponentExists: style =>
      !!element.querySelector(`.${styles.suffix} ${style}`),
    isMenuArrowLast: () =>
      element.querySelectorAll(
        `.${styles.suffixes} .${styles.suffix}:last-child > .${
          styles.menuArrow
        }`,
      ).length === 1,
    hasExclamation: () => !!element.querySelector(`.${styles.exclamation}`),
    isNarrowError: () => !!element.querySelector(`.${styles.narrow}`),
    hasHelp: () => !!element.querySelector(`.${styles.help}`),
    hasError: () => element.classList.contains(styles.hasError),
    getTooltipElement: () => element,
    hasLoader: () => element.querySelector(`.loaderContainer`),
    getTooltipDataHook: () => 'input-tooltip',
    getDataHook: () => element.getAttribute('data-hook'),
    getUnit: () => unitNode.textContent,
    hasMagnifyingGlass: () => !!magnifyingGlassNode,
    hasMenuArrow: () => !!menuArrowNode,
    hasClearButton: () => !!clearButton,
    isRTL: () => element.className.indexOf(styles.rtl) >= 0,
    isFocusedStyle: () => element.classList.contains(styles.hasFocus),
    isHoveredStyle: () => element.classList.contains(styles.hasHover),
    isDisabled: () => element.classList.contains(styles.disabled),
    isOfStyle: style => element.classList.contains(styles[`theme-${style}`]),
    isOfSize: size => element.classList.contains(styles[`size-${size}`]),
    isFocus: () => document.activeElement === input,
    exists: () => !!(element && element.querySelector('input')),
    startComposing: () => ReactTestUtils.Simulate.compositionStart(input),
    endComposing: () => ReactTestUtils.Simulate.compositionEnd(input),
    getCursorLocation: () => input.selectionStart,
    getRootElementClasses: () => element.classList,
    getInputElementClasses: () => input.classList,
    hasRightBorderRadius: () =>
      !element.classList.contains(styles.noRightBorderRadius),
    hasLeftBorderRadius: () =>
      !element.classList.contains(styles.noLeftBorderRadius),
  };

  return driver;
};

export default inputDriverFactory;
