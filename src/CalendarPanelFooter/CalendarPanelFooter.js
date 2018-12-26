import React from 'react';
import PropTypes from 'prop-types';
import styles from './CalendarPanelFooter.scss';
import { Item, ItemGroup, Label, Toolbar } from '../TableToolbar';
import Button from '../Button';

class CalendarPanelFooter extends React.PureComponent {
  static displayName = 'CalendarPanelFooter';

  static propTypes = {
    dataHook: PropTypes.string,
    primaryActionLabel: PropTypes.string.isRequired,
    secondaryActionLabel: PropTypes.string.isRequired,
    primaryActionDisabled: PropTypes.bool.isRequired,
    primaryActionOnClick: PropTypes.func.isRequired,
    secondaryActionOnClick: PropTypes.func.isRequired,
    selectedDays: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
      PropTypes.shape({
        from: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.instanceOf(Date),
        ]),
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      }),
    ]),
    dateToString: PropTypes.func.isRequired,
  };

  render() {
    const {
      dataHook,
      dateToString,
      secondaryActionLabel,
      primaryActionLabel,
      selectedDays,
      primaryActionDisabled,
      primaryActionOnClick,
      secondaryActionOnClick,
    } = this.props;
    return (
      <div className={styles.root} data-hook={dataHook}>
        <Toolbar>
          <ItemGroup position="start">
            <Item>
              {selectedDays && (
                <Label dataHook="selected-days-label">
                  {selectedDays.from
                    ? `${dateToString(selectedDays.from)}-${dateToString(
                        selectedDays.to,
                      )}`
                    : dateToString(selectedDays)}
                </Label>
              )}
            </Item>
          </ItemGroup>
          <ItemGroup position="end">
            <Item>
              <Button
                upgrade
                priority="secondary"
                dataHook="secondary-action-button"
                onClick={secondaryActionOnClick}
              >
                {secondaryActionLabel}
              </Button>
            </Item>
            <Item>
              <Button
                upgrade
                disabled={primaryActionDisabled}
                dataHook="primary-action-button"
                onClick={primaryActionOnClick}
              >
                {primaryActionLabel}
              </Button>
            </Item>
          </ItemGroup>
        </Toolbar>
      </div>
    );
  }
}

export default CalendarPanelFooter;
