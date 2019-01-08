import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Box.scss';

const Box = props => {
  const { children, inline } = props;
  const rootClassNames = classNames(styles.root, {
    [styles.inline]: inline,
  });

  return (
    <div className={rootClassNames}>
      {children}
    </div>
  );
};

Box.displayName = 'Box';

Box.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
  verticalAlign: PropTypes.string,
  padding: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  margin: PropTypes.oneOfType[PropTypes.string, PropTypes.number],
  width: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  inline: PropTypes,
};

export default Box;
