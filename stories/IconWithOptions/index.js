import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Text from 'wix-style-react/Text';
import TextLink from 'wix-style-react/TextLink';
import Markdown from 'wix-storybook-utils/Markdown';
import TabbedView from 'wix-storybook-utils/TabbedView';
import { Layout, Cell } from 'wix-style-react/Layout';

import LiveCodeExample from '../utils/Components/LiveCodeExample';

const createIconWithOptionSnippet = ({ iconComponent = 'Image' } = {}) => `
<div style={{ textAlign: 'center' }}>
  <DropdownPopover
    showArrow
    onSelect={selectedOption => console.log('Selected option:', selectedOption)}
    options={[
      { id: 0, value: 'First option' },
      { id: 1, value: 'Second option' },
      { id: 2, value: 'Third option', disabled: true },
      { id: 3, value: 'Fourth option' },
      { id: 4, value: 'Fifth option' },
    ]}
  >
    {({ open, close }) => {
      return (
        <TextButton skin="dark" onMouseEnter={open} onMouseLeave={close}>
          <${iconComponent} size="30" />
        </TextButton>
      );
    }}
  </DropdownPopover>
</div>
`;

storiesOf('4. Selection', module).add('4.1 + IconWithOptions', () => (
  <TabbedView tabs={['Usage']}>
    <div>
      <Markdown
        source={`
# 4.1 + IconWithOptions

The \`<IconWithOptions/>\` component has been deprecated. You can use the newer
\`<DropdownPopover/>\` component (which handles positioning in a better way) in order to achieve a
similar result.

## Included components
          `}
      />

      <lu>
        <li>
          <TextLink
            onClick={linkTo('5. Buttons', '5.2 IconButton')}
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
              onClick={linkTo('Deprecated', 'IconWithOptions')}
            >{`<IconWithOptions/>`}</TextLink>{' '}
            component.
          </Text>
        </li>
      </lu>

      <Markdown source={`## Examples`} />

      <div style={{ maxWidth: 1254 }}>
        <Layout>
          <Cell span={6}>
            <LiveCodeExample
              compact
              title="Basic snippet"
              initialCode={createIconWithOptionSnippet()}
            />
          </Cell>
        </Layout>
      </div>
    </div>
  </TabbedView>
));
