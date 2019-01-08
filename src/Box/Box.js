import React from 'react';

const Box = props => {
  const { children } = props;

  return <div>{children}</div>;
};

Box.displayName = 'Box';

export default Box;
