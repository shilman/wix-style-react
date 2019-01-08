import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Box.scss';

const spacingUnit = 6;
const formatValue = value => isFinite(value) ? value * spacingUnit : `${value}`;

const Box = props => {
  const {
    children,
    inline,
    align,
    verticalAlign,
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    minWidth,
    maxWidth,
    width,
    minHeight,
    maxHeight,
    height,
  } = props;
  const rootClassNames = classNames(styles.root, {
    [styles.inline]: inline,
  });
  const rootStyles = {
    // Alignment
    justifyContent: align,
    alignItems: verticalAlign,

    // Spacing
    padding: formatValue(padding),
    paddingTop: formatValue(paddingTop),
    paddingRight: formatValue(paddingRight),
    paddingBottom: formatValue(paddingBottom),
    paddingLeft: formatValue(paddingLeft),
    margin: formatValue(margin),
    marginTop: formatValue(marginTop),
    marginRight: formatValue(marginRight),
    marginBottom: formatValue(marginBottom),
    marginLeft: formatValue(marginLeft),

    // Sizing
    minWidth,
    maxWidth,
    width,
    minHeight,
    maxHeight,
    height,
  };

  return (
    <div className={rootClassNames} style={rootStyles}>
      {children}
    </div>
  );
};

Box.displayName = 'Box';

Box.propTypes = {
  children: PropTypes.node.isRequired,
  inline: PropTypes,
  align: PropTypes.string,
  verticalAlign: PropTypes.string,
  padding: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  paddingTop: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  paddingRight: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  paddingBottom: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  paddingLeft: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  margin: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  marginTop: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  marginRight: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  marginBottom: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  marginLeft: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  width: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  height: PropTypes.string,
};

Box.defaultProps = {
  inline: false,
};

export default Box;
