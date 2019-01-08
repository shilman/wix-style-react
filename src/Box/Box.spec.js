import React from 'react';
import { mount } from 'enzyme';

import Box from './Box';

describe('Box', () => {
  it('should render the passed children', async () => {
    const children = <span>Children</span>;
    const wrapper = mount(
      <Box>
        {children}
      </Box>
    );

    expect(wrapper.contains(children)).toBeTruthy();
  });
});