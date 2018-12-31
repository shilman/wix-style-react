import React from 'react';
import PropTypes from 'prop-types';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import InputWithTags from './InputWithTags';
import last from 'lodash/last';
import difference from 'difference';
import uniqueId from 'lodash/uniqueId';
import { validatorWithSideEffect } from '../utils/propTypes';
import deprecationLog from '../utils/deprecationLog';

class MultiSelect extends InputWithOptions {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.state = { ...this.state, pasteDetected: false };
  }

  _isNewCallbackApi() {
    return this.props.onTagsAdded;
  }

  hideOptions() {
    super.hideOptions();
    this.clearInput();
  }

  onClickOutside() {
    const { value, options, onSelect } = this.props;
    if (!options.length && value) {
      onSelect([{ id: value.trim(), label: value.trim() }]);
    }
    if (this.state.showOptions) {
      this.hideOptions();
    }
  }

  getUnselectedOptions() {
    const optionIds = this.props.options.map(option => option.id);
    const tagIds = this.props.tags.map(tag => tag.id);
    const unselectedOptionsIds = difference(optionIds, tagIds);
    return this.props.options.filter(option =>
      unselectedOptionsIds.includes(option.id),
    );
  }

  dropdownAdditionalProps() {
    return {
      options: this.getUnselectedOptions().filter(this.props.predicate),
      closeOnSelect: false,
      selectedHighlight: false,
    };
  }

  closeOnSelect() {
    return false;
  }

  inputAdditionalProps() {
    return {
      inputElement: (
        <InputWithTags
          onReorder={this.props.onReorder}
          maxNumRows={this.props.maxNumRows}
          mode={this.props.mode}
        />
      ),
      onKeyDown: this.onKeyDown,
      delimiters: this.props.delimiters,
      onPaste: this.onPaste,
    };
  }

  onPaste() {
    this.setState({ pasteDetected: true });
  }

  _splitValues(value) {
    const delimitersRegexp = new RegExp(this.props.delimiters.join('|'), 'g');
    const valueWithCommas = value.replace(delimitersRegexp, ',');
    return valueWithCommas
      .split(',')
      .map(str => str.trim())
      .filter(str => str);
  }

  _onChange(event) {
    if (this.state.pasteDetected) {
      if (this._isNewCallbackApi()) {
        const value = event.target.value;
        this.setState({ pasteDetected: false }, () => {
          this.submitValue(value);
        });
      } else {
        const tags = this._splitValues(event.target.value);
        const suggestedOptions = tags.map(tag => {
          const tagObj = this.getUnselectedOptions().find(
            element =>
              this.props.valueParser(element).toLowerCase() ===
              tag.toLowerCase(),
          );
          return tagObj
            ? tagObj
            : { id: uniqueId('customOption_'), value: tag, theme: 'error' };
        });

        this.setState({ pasteDetected: false }, () => {
          this.onSelect(suggestedOptions);
          this.clearInput();
        });
      }
    } else {
      this.setState({ inputValue: event.target.value });
      this.props.onChange && this.props.onChange(event);
    }
    // If the input value is not empty, should show the options
    if (event.target.value.trim()) {
      this.showOptions();
    }
  }

  _onSelect(option) {
    this.onSelect([option]);
  }

  _onManuallyInput(inputValue) {
    const { value, options } = this.props;

    if (value && value.trim()) {
      if (options.length) {
        const unselectedOptions = this.getUnselectedOptions();
        const visibleOptions = unselectedOptions.filter(this.props.predicate);
        const maybeNearestOption = visibleOptions[0];

        if (maybeNearestOption) {
          this.onSelect([maybeNearestOption]);
        }
      } else {
        this.props.onSelect([{ id: value.trim(), label: value.trim() }]);
      }
    }

    if (inputValue) {
      inputValue = inputValue.trim();
      if (this.closeOnSelect()) {
        this.hideOptions();
      }

      this.submitValue(inputValue);
    }
    this.clearInput();
  }

  getManualSubmitKeys() {
    return ['Enter', 'Tab'].concat(this.props.delimiters);
  }

  onKeyDown(event) {
    const { tags, value, onRemoveTag } = this.props;

    if (
      tags.length > 0 &&
      (event.key === 'Delete' || event.key === 'Backspace') &&
      value.length === 0
    ) {
      onRemoveTag(last(tags).id);
    }

    if (event.key === 'Escape') {
      this.clearInput();
      super.hideOptions();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  optionToTag({ id, value, tag, theme }) {
    return tag ? { id, ...tag } : { id, label: value, theme };
  }

  onSelect(options) {
    this.clearInput();

    if (this.props.onSelect) {
      options = options.map(this.optionToTag);
      this.props.onSelect(options);
    }

    this.input.focus();
  }

  submitValue(inputValue) {
    if (!inputValue) {
      this.input.blur();
      return;
    }

    const { onManuallyInput, onTagsAdded } = this.props;
    if (this._isNewCallbackApi()) {
      onTagsAdded && onTagsAdded([inputValue]);
    } else if (onManuallyInput) {
      onManuallyInput(
        inputValue,
        this.optionToTag({ id: uniqueId('customOption_'), value: inputValue }),
      );
    }

    this.clearInput();
  }

  clearInput() {
    this.input.clear();
    if (this.props.onChange) {
      this.props.onChange({ target: { value: '' } });
    }
  }
}

MultiSelect.propTypes = {
  ...InputWithOptions.propTypes,
  predicate: PropTypes.func,
  tags: PropTypes.array,
  maxNumRows: PropTypes.number,
  delimiters: PropTypes.array,
  mode: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onReorder: PropTypes.func,
  /** A callback which is called when the user performs a Submit action.
   * Submit action triggers are: "Enter", "Tab", [typing any defined delimiters], Paste action.
   * The callback receives one argument which is an array of strings, which are the result of splitting the input value by the given delimiters */
  onTagsAdded: validatorWithSideEffect(PropTypes.func, (props, propName) => {
    if (props[propName] && props['onManuallyInput']) {
      deprecationLog(
        `When 'onTagsAdded' is passed then 'isManuallyInput' will not be called. Please remove the 'isManuallyInput' prop.`,
      );
    }
  }),
};

MultiSelect.defaultProps = {
  ...InputWithOptions.defaultProps,
  highlight: true,
  theme: 'tags',
  predicate: () => true,
  tags: [],
  delimiters: [','],
};

export default MultiSelect;
