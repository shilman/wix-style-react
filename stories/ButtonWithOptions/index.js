import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Text from 'wix-style-react/Text';
import TextLink from 'wix-style-react/TextLink';
import Markdown from 'wix-storybook-utils/Markdown';
import TabbedView from 'wix-storybook-utils/TabbedView';
import { Layout, Cell } from 'wix-style-react/Layout';

import LiveCodeExample, {
  createPropsArray,
} from '../utils/Components/LiveCodeExample';

const createButtonWithOptionSnippet = ({
  dropdownPopoverProps = {},
  buttonProps = {},
  showSelectedOption = false,
  withPrefix = false,
  withSuffix = false,
  component = 'Button',
  children = 'Click on me',
  dataHook = '',
} = {}) => `
<div style={{ textAlign: 'center' }}>
  <DropdownPopover
    dataHook="${dataHook}"
    ${createPropsArray(dropdownPopoverProps).join('\n    ')}
    onSelect={selectedOption => console.log('Selected option:', selectedOption)}
    options={[
      { id: 0, value: 'First option' },
      { id: 1, value: 'Second option' },
      { id: 2, value: 'Third option', disabled: true },
      { id: 3, value: 'Fourth option' },
      { id: 4, value: 'Fifth option' },
    ]}
  >
    {({ toggle${showSelectedOption ? ', selectedOption = {}' : ''} }) => {
      return (
        <${component}
          upgrade
          onClick={toggle}
          ${createPropsArray(buttonProps)
            .concat([
              withPrefix && `prefixIcon={<Add />}`,
              withSuffix && `suffixIcon={<ChevronDown />}`,
            ])
            .filter(Boolean)
            .join('\n          ')}
        >
          ${
            showSelectedOption
              ? `{selectedOption.value || 'Please choose'}`
              : children
          }
        </${component}>
      );
    }}
  </DropdownPopover>
</div>
`;

storiesOf('4. Selection', module).add('4.1 + ButtonWithOptions', () => (
  <TabbedView tabs={['Usage']}>
    <div>
      <Markdown
        source={`
# 4.1 + ButtonWithOptions

The \`<ButtonWithOptions/>\` component has been deprecated. You can use the newer
\`<DropdownPopover/>\` component (which handles positioning in a better way) in order to achieve a
similar result.

## Included components
          `}
      />

      <lu>
        <li>
          <TextLink
            onClick={linkTo('5. Buttons', '5.1 Button')}
          >{`<Button/>`}</TextLink>
        </li>
        <li>
          <TextLink
            onClick={linkTo('Components', 'DropdownPopover')}
          >{`<DropdownPopover/>`}</TextLink>
        </li>
        <li>
          <Text>
            You can sill refer to the legcy{' '}
            <TextLink
              onClick={linkTo('Deprecated', 'ButtonWithOptions')}
            >{`<ButtonWithOptions/>`}</TextLink>{' '}
            component.
          </Text>
        </li>
      </lu>

      <Markdown source={`## Examples`} />

      <div style={{ maxWidth: 1254 }}>
        <Layout>
          <Cell span={4}>
            <LiveCodeExample
              compact
              title="Basic snippet"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-basic',
              })}
            />
          </Cell>

          <Cell span={4}>
            <LiveCodeExample
              compact
              title="Show selected option"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-show-selected',
                showSelectedOption: true,
              })}
            />
          </Cell>

          <Cell span={4}>
            <LiveCodeExample
              compact
              title="Disabled"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-disabled',
                buttonProps: { disabled: true },
              })}
            />
          </Cell>

          <Cell span={4}>
            <LiveCodeExample
              compact
              title="With arrow"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-arrow',
                dropdownPopoverProps: { showArrow: true },
              })}
            />
          </Cell>

          <Cell span={4}>
            <LiveCodeExample
              compact
              title="Prefix and suffix icons"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-icons',
                showSelectedOption: true,
                withPrefix: true,
                withSuffix: true,
              })}
            />
          </Cell>

          <Cell span={4}>
            <LiveCodeExample
              compact
              title="With different theme"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-theme',
                buttonProps: { skin: 'light' },
              })}
            />
          </Cell>

          <Cell span={4}>
            <LiveCodeExample
              compact
              title="With a different size"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-size',
                buttonProps: { size: 'small' },
              })}
            />
          </Cell>

          <Cell span={4}>
            <LiveCodeExample
              compact
              title="With different placement"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-placement',
                dropdownPopoverProps: { placement: 'bottom-start' },
                children: 'Click!',
              })}
            />
          </Cell>

          <Cell span={4}>
            <LiveCodeExample
              compact
              title="With IconButton"
              initialCode={createButtonWithOptionSnippet({
                dataHook: 'story-example-icon-button',
                dropdownPopoverProps: { showArrow: true },
                component: 'IconButton',
                children: '<More />',
              })}
            />
          </Cell>
        </Layout>
      </div>
    </div>
  </TabbedView>
));
