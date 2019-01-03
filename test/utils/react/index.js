import { render } from 'react-testing-library';
import { Simulate } from 'react-dom/test-utils';

/** Create driver
 * @param [HTMLElement] element. If provided then the driver would be created with this element. If not provided then it assumes that the rendered root element is the component's root element and it will be used for the driver.
 */
const createDriver = (driverFactory, rendered, element) => {
  // TODO: See if Simulate should be replaced with fireEvent from 'react-testing-library'
  return driverFactory({
    element: element || rendered.container.firstChild,
    wrapper: rendered.container,
    eventTrigger: Simulate,
  });
};

/**
 * Creates a `render` function that returns the same object as `react-testing-library`'s render, but
 * with and extra `driver` property.
 *
 * The returned render function arguments:
 * @param [React.Element] jsx a jsx element to render
 * @param [string] dataHook if provided then the driver would be created with the element which is found by the dataHook. If not provided then it assumes that the rendered root element is the component's root element and it will be used for the driver.
 */
const createRendererWithDriver = driverFactory => (jsx, dataHook) => {
  const rendered = render(jsx);

  const driver = createDriver(
    driverFactory,
    rendered,
    dataHook
      ? rendered.container.querySelector(`[data-hook="${dataHook}"]`)
      : undefined,
  );
  return {
    ...rendered,
    driver,
  };
};

export * from 'react-testing-library';
export { createDriver, createRendererWithDriver };
