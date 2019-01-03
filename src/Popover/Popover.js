import React from 'react';
import { Popover as CorePopover } from 'wix-ui-core/popover';
import { buildChildrenObject } from 'wix-ui-core/dist/src/utils';
import PropTypes from 'prop-types';

import style from './Popover.st.css';

export const placements = [
  'auto-start',
  'auto',
  'auto-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-end',
  'bottom',
  'bottom-start',
  'left-end',
  'left',
  'left-start',
];

const ANIMATION_DURATION = 300;

class Popover extends React.Component {
  static displayName = 'Popover';

  static Element = CorePopover.Element;
  static Content = CorePopover.Content;

  static propTypes = {
    ...CorePopover.propTypes,
    dataHook: PropTypes.string,

    animate: PropTypes.bool,

    /** The theme of the popover */
    theme: PropTypes.oneOf(['dark', 'light']),

    children: (props, propName) => {
      const childrenArr = React.Children.toArray(props[propName]);
      const childrenObj = buildChildrenObject(childrenArr, {
        Element: null,
        Content: null,
      });

      if (!childrenObj.Element) {
        return new Error(
          'Invalid children provided, <Popover.Element/> must be provided',
        );
      }

      if (!childrenObj.Content) {
        return new Error(
          'Invalid children provided, <Popover.Content/> must be provided',
        );
      }

      return childrenArr.reduce((err, child) => {
        if (
          !err &&
          (child.type.displayName !== 'Popover.Element' &&
            child.type.displayName !== 'Popover.Content')
        ) {
          return new Error(
            `Invalid children provided, unknown child <${child.type
              .displayName || child.type}/> supplied`,
          );
        }

        return err;
      }, false);
    },
  };

  static defaultProps = {
    appendTo: 'parent',
    animate: false,
  };

  render() {
    const { dataHook, animate, theme, ...rest } = this.props;

    const timeout = animate
      ? { enter: ANIMATION_DURATION, exit: 0 }
      : undefined;

    return (
      <CorePopover
        data-hook={dataHook}
        timeout={timeout}
        {...rest}
        {...style(
          'root',
          {
            theme,
          },
          this.props,
        )}
      />
    );
  }
}

export default Popover;
