import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import defaultTo from 'lodash/defaultTo';
import differenceBy from 'lodash/differenceBy';
import { allValidators } from '../utils/propTypes';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import styles from './Dropdown.scss';
import PropTypes from 'prop-types';

const NO_SELECTED_ID = null;
export const UPGRADE_PROP_NAME = 'upgrade';

class Dropdown extends InputWithOptions {
  constructor(props) {
    super(props);
    if (props.upgrade) {
      this.state = {
        value: '',
        selectedId: NO_SELECTED_ID,
        ...Dropdown.getNextState(
          props,
          defaultTo(props.selectedId, props.initialSelectedId),
        ),
      };
    } else {
      this.deprecatedUpdate(props, { isFirstTime: true });
    }
  }

  isSelectedIdControlled() {
    const { upgrade, selectedId } = this.props;
    return upgrade && !isUndefined(selectedId);
  }

  isControlledSupported() {
    return this.props.upgrade;
  }

  static isOptionsEqual(optionsA, optionsB) {
    return differenceBy(optionsA, optionsB, o => o.id).length === 0;
  }

  getSelectedId() {
    if (this.isControlledSupported()) {
      return this.isSelectedIdControlled()
        ? this.props.selectedId
        : this.state.selectedId;
    } else {
      return this.state.selectedId;
    }
  }
  _onInputClicked(event) {
    if (
      this.state.showOptions &&
      Date.now() - this.state.lastOptionsShow > 200
    ) {
      this.hideOptions();
    } else {
      this.showOptions();
    }

    if (this.props.onInputClicked) {
      this.props.onInputClicked(event);
    }
  }

  /**
   * Updates the value by the selectedId.
   * If selectedId is not found in options, then value is NOT changed.
   */
  static getNextState(props, selectedId) {
    if (!isUndefined(selectedId)) {
      const option = props.options.find(_option => {
        return _option.id === selectedId;
      });

      if (option) {
        const value = props.valueParser(option) || '';
        return { value, selectedId };
      } else {
        return { value: '', selectedId: NO_SELECTED_ID };
      }
    }
    return {};
  }

  deprecatedUpdate(props, { isFirstTime }) {
    let value = '',
      selectedId = -1;
    if (!isUndefined(props.selectedId)) {
      const option = props.options.find(_option => {
        return _option.id === props.selectedId;
      });

      if (option) {
        value = props.valueParser(option);
        selectedId = option.id;
      }
    }

    if (isFirstTime) {
      this.state = { value, selectedId };
    } else {
      this.setState({ value, selectedId });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.upgrade) {
      if (
        nextProps.selectedId !== this.props.selectedId ||
        !Dropdown.isOptionsEqual(this.props.options, nextProps.options)
      ) {
        this.setState(
          Dropdown.getNextState(
            nextProps,
            defaultTo(nextProps.selectedId, this.state.selectedId),
          ),
        );
      }
    } else {
      this.deprecatedUpdate(nextProps, { isFirstTime: false });
    }
  }

  inputClasses() {
    const classes = { [styles.readonly]: true };
    classes[styles.noBorder] = this.props.noBorder;
    return classNames(classes);
  }

  dropdownAdditionalProps() {
    return {
      selectedId: this.getSelectedId(),
      value: this.state.value,
      tabIndex: -1,
    };
  }

  inputAdditionalProps() {
    return {
      readOnly: true,
      value: this.state.value,
    };
  }

  _onSelect(option) {
    if (!this.isControlledSupported() || !this.isSelectedIdControlled()) {
      this.setState({
        value: this.props.valueParser(option),
        selectedId: option.id,
      });
    }
    super._onSelect(option);
  }

  _onChange(event) {
    this.setState({ value: event.target.value });
    super._onChange(event);
  }
}

Dropdown.propTypes = {
  ...InputWithOptions.propTypes,
  /** When true, then `selectedId` is used for Controlled mode, and `initialSelectedId` for Uncontrolled mode */
  [UPGRADE_PROP_NAME]: PropTypes.bool,
  selectedId: allValidators(
    InputWithOptions.propTypes.selectedId,
    (props, propName) => {
      if (
        props[propName] !== undefined &&
        props['initialSelectedId'] !== undefined
      ) {
        return new Error(
          `'selectedId' and 'initialSelectedId' cannot both be used at the same time.`,
        );
      }
    },
  ),
  initialSelectedId: allValidators(
    InputWithOptions.propTypes.selectedId,
    (props, propName) => {
      if (props[propName] !== undefined && !props[UPGRADE_PROP_NAME]) {
        return new Error(
          `'initialSelectedId' can be used only if you pass '${UPGRADE_PROP_NAME}=true' as well.`,
        );
      }
    },
  ),
};

Dropdown.defaultProps = InputWithOptions.defaultProps;
Dropdown.displayName = 'Dropdown';

export default Dropdown;
