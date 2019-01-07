import classNames from 'classnames';
import isUndefined from 'lodash/isUndefined';
import { validatorWithSideEffect } from '../utils/propTypes';
import deprecationLog from '../utils/deprecationLog';
import InputWithOptions from '../InputWithOptions/InputWithOptions';
import styles from './Dropdown.scss';
import PropTypes from 'prop-types';

class Dropdown extends InputWithOptions {
  constructor(props) {
    super(props);
    this.update(props, { isFirstTime: true });
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

  update(props, { isFirstTime }) {
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
    this.update(nextProps, { isFirstTime: false });
  }

  inputClasses() {
    const classes = { [styles.readonly]: true };
    classes[styles.noBorder] = this.props.noBorder;
    return classNames(classes);
  }

  dropdownAdditionalProps() {
    return {
      selectedId: this.state.selectedId,
      value: this.state.value,
      tabIndex: -1,
    };
  }

  inputAdditionalProps() {
    return { readOnly: true, value: this.state.value };
  }

  _onSelect(option) {
    if (!this.props.controlled) {
      this.setState({
        value: this.props.valueParser(option),
        selectedId: option.id,
      });
    }
    super._onSelect(option);
  }
}

Dropdown.propTypes = {
  ...InputWithOptions.propTypes,
  /** When true, then `selectedId` is used for Controlled mode, and `initiallySelectedId` for Uncontrolled mode */
  upgrade: PropTypes.bool,
  selectedId: validatorWithSideEffect(
    InputWithOptions.propTypes.selectedId,
    (props, propName) => {
      if (props[propName] && props['initiallySelectedId']) {
        deprecationLog(
          `'selectedId' and 'initiallySelectedId' cannot both be used at the same time.`,
        );
      }
    },
  ),
  initiallySelectedId: validatorWithSideEffect(
    InputWithOptions.propTypes.selectedId,
    (props, propName) => {
      if (props[propName] && props['selectedId']) {
        deprecationLog(
          `'selectedId' and 'initiallySelectedId' cannot both be used at the same time.`,
        );
      }
    },
  ),
};

Dropdown.defaultProps = InputWithOptions.defaultProps;
Dropdown.displayName = 'Dropdown';

export default Dropdown;
