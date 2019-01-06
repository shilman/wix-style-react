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

import { renderSection, IncludedComponents } from '../UXStoryTemplate';

import readmeApi from '../../src/MultiSelect/README.API.md';
import playgroundStoryConfig from '../components/MultiSelect/MultiSelectPlaygroundConfig';

import ExampleSelectSimple from './ExampleSelectSimple';
import ExampleSelectSimpleRaw from '!raw-loader!./ExampleSelectSimple';
import ExampleSelectAutocomplete from './ExampleSelectAutocomplete';
import ExampleSelectAutocompleteRaw from '!raw-loader!./ExampleSelectAutocomplete';
import ExampleSelectInput from './ExampleSelectInput';
import ExampleSelectInputRaw from '!raw-loader!./ExampleSelectInput';

import ExampleSuggestions from './ExampleSuggestions';
import ExampleSuggestionsRaw from '!raw-loader!./ExampleSuggestions';

import ExampleTagsInput from './ExampleTagsInput';
import ExampleTagsInputRaw from '!raw-loader!./ExampleTagsInput';

import ExampleReorderable from './ExampleReorderable';
import ExampleReorderableRaw from '!raw-loader!./ExampleReorderable';

import ExampleWithError from './ExampleWithError';
import ExampleWithErrorRaw from '!raw-loader!./ExampleWithError';

import { storySettings } from './storySettings';
import { AutoExampleWrapper } from '../AutoExampleWrapper';

import styles from './styles.scss';

const examples = (
  <div>
    <h1>Examples</h1>

    <CodeExample title="Select (Simple)" code={ExampleSelectSimpleRaw}>
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

    <CodeExample
      title="Select Input (Autocomplete + Allow New Tags)"
      code={ExampleSelectInputRaw}
    >
      <div className={styles.exampleContainer}>
        <ExampleSelectInput />
      </div>
    </CodeExample>

    <CodeExample title="Suggest + Allow New Tags" code={ExampleSuggestionsRaw}>
      <div className={styles.exampleContainer}>
        <ExampleSuggestions />
      </div>
    </CodeExample>

    <CodeExample title="Tags Input (No options)" code={ExampleTagsInputRaw}>
      <div className={styles.exampleContainer}>
        <ExampleTagsInput />
      </div>
    </CodeExample>

    <CodeExample title="Reorderable" code={ExampleReorderableRaw}>
      <div className={styles.exampleContainer}>
        <ExampleReorderable />
      </div>
    </CodeExample>
    <h2>Presentation</h2>
    <CodeExample title="With Error message" code={ExampleWithErrorRaw}>
      <div className={styles.exampleContainer}>
        <ExampleWithError />
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
