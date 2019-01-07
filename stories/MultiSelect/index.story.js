import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';
import MultiSelect from '../../src/MultiSelect';

import {
  tab,
  importExample,
  description,
  playground,
  testkit,
} from 'wix-storybook-utils/Sections';

import {
  renderSection,
  IncludedComponents,
  Title,
  SubTitle,
} from '../UXStoryTemplate';

import readmeApi from '../../src/MultiSelect/README.API.md';
import playgroundStoryConfig from '../components/MultiSelect/MultiSelectPlaygroundConfig';

import ExampleSelectSimple from './ExampleSelectSimple';
import ExampleSelectSimpleRaw from '!raw-loader!./ExampleSelectSimple';

import ExampleSelectAutocomplete from './ExampleSelectAutocomplete';
import ExampleSelectAutocompleteRaw from '!raw-loader!./ExampleSelectAutocomplete';

import ExampleSuggestions from './ExampleSuggestions';
import ExampleSuggestionsRaw from '!raw-loader!./ExampleSuggestions';

import ExampleTagInput from './ExampleTagInput';
import ExampleTagInputRaw from '!raw-loader!./ExampleTagInput';

import ExampleTagInputSelection from './ExampleTagInputSelection';
import ExampleTagInputSelectionRaw from '!raw-loader!./ExampleTagInputSelection';

import ExampleReorderable from './ExampleReorderable';
import ExampleReorderableRaw from '!raw-loader!./ExampleReorderable';

import ExampleThumbVariations from './ExampleThumbVariations';
import ExampleThumbVariationsRaw from '!raw-loader!./ExampleThumbVariations';

import { storySettings } from './storySettings';

import styles from './styles.scss';

const examples = (
  <div>
    <Title>Examples</Title>
    <SubTitle>Bihavior</SubTitle>
    <CodeExample title="Select" code={ExampleSelectSimpleRaw}>
      <div className={styles.exampleContainer}>
        <ExampleSelectSimple />
      </div>
    </CodeExample>

    <CodeExample
      title="Select + Autocomplete"
      code={ExampleSelectAutocompleteRaw}
    >
      <div className={styles.exampleContainer}>
        <ExampleSelectAutocomplete />
      </div>
    </CodeExample>

    <CodeExample title="Tag Input" code={ExampleTagInputRaw}>
      <div className={styles.exampleContainer}>
        <ExampleTagInput />
      </div>
    </CodeExample>

    <CodeExample title="Tag Input + Suggestions" code={ExampleSuggestionsRaw}>
      <div className={styles.exampleContainer}>
        <ExampleSuggestions />
      </div>
    </CodeExample>

    <CodeExample
      title="Tag Input + Selection"
      code={ExampleTagInputSelectionRaw}
    >
      <div className={styles.exampleContainer}>
        <ExampleTagInputSelection />
      </div>
    </CodeExample>

    <CodeExample title="Reorderable" code={ExampleReorderableRaw}>
      <div className={styles.exampleContainer}>
        <ExampleReorderable />
      </div>
    </CodeExample>

    <CodeExample title="ThumbVariations" code={ExampleThumbVariationsRaw}>
      <div className={styles.exampleContainer}>
        <ExampleThumbVariations />
      </div>
    </CodeExample>
  </div>
);

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: MultiSelect,
  componentPath: '../../src/MultiSelect',
  ...playgroundStoryConfig,
  sections: [
    tab({
      title: 'Description',
      sections: [
        description({
          text:
            'A component for selecting/creating multiple values, and displaying them as tags.',
        }),

        renderSection(
          <IncludedComponents componentNames={['MultiSelect', 'Tag']} />,
        ),
        importExample({
          source: "import MultiSelect from 'wix-style-react/MultiSelect';",
        }),

        renderSection(examples),
      ],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),

    tab({
      title: 'API',
      // Not using built-in api because we can not override props' description of InputWithOptions
      sections: [renderSection(readmeApi)],
    }),

    tab({
      title: 'Testkit',
      sections: [testkit()],
    }),
  ],
};
