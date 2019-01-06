import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';
import MultiSelect from '../../src/MultiSelect';

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

const countries = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DL' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'IL' },
  { name: 'Illinois', code: 'IN' },
  { name: 'Indiana', code: 'IA' },
];

export const options = countries.map(country => ({
  ...country,
  value: country.name, // This can be any ReactNode
  id: country.code,
}));

const valueParser = option => (option.tag ? option.tag.label : option.value);

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: MultiSelect,
  componentPath: '../../src/MultiSelect',
  componentWrapper: AutoExampleWrapper,
  componentProps: (setState, getState) => ({
    dataHook: storySettings.dataHook,
    value: '',
    tags: [],
    options,

    predicate: option => {
      return valueParser(option)
        .toLowerCase()
        .includes(getState().value.toLowerCase());
    },

    valueParser,

    onChange: e => setState({ value: e.target.value }),

    onSelect: tags => {
      Array.isArray(tags)
        ? setState({ tags: [...getState().tags, ...tags] })
        : setState({ tags: [...getState().tags, tags] });
    },

    onRemoveTag: tagId =>
      setState({
        tags: getState().tags.filter(currTag => currTag.id !== tagId),
      }),
  }),

  examples: (
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

      <CodeExample
        title="Suggest + Allow New Tags"
        code={ExampleSuggestionsRaw}
      >
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
  ),
};
