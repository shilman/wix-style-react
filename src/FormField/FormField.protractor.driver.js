import { hasClass } from '../../test/utils/protractor-helpers';
import styles from './FormField.scss';

const fieldDriverFactory = component => {
  const byHook = hook => component.$(`[data-hook*=${hook}]`);

  return {
    element: () => component,
    getLabel: () => byHook('formfield-label'),
    hasTopLabel: () => hasClass(component, styles.labelFromTop),
    hasRightLabel: () => hasClass(component, styles.labelFromRight),
    hasLeftLabel: () => hasClass(component, styles.labelFromLeft),
    isRequired: () => !!byHook('formfield-asterisk'),
    isInfoIconVisible: () => !!byHook('formfield-infoicon'),
    isContentStretched: () => hasClass(component, styles.stretchContent),
  };
};

export default fieldDriverFactory;
