import React from 'react';
import InputWithTags from './InputWithTags';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';
import inputDriverFactory from '../Input/Input.driver';

const driverFactory = ({ element }) => {
  return {
    inputDriver: () =>
      inputDriverFactory({
        element: element.querySelector(`[data-hook="inputWithTags-input"]`),
      }),
  };
};

describe('InputWithTags', () => {
  const render = createRendererWithDriver(driverFactory);

  afterEach(() => {
    cleanup();
  });

  it('should clear input value state when clear is called', () => {
    const onChange = jest.fn();
    let component;
    const { driver } = render(
      <InputWithTags onChange={onChange} ref={comp => (component = comp)} />,
    );
    driver.inputDriver().enterText('foo');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe('foo');

    component.clear();

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0].target.value).toBe('');
  });
});
