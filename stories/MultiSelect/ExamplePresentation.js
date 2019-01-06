import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';
import Heading from 'wix-style-react/Heading';
import Text from 'wix-style-react/Text';
import { Layout, Cell } from 'wix-style-react/Layout';

export default () => (
  <Layout>
    <Cell span="4">
      <Heading appearance="H3">With error</Heading>
    </Cell>
    <Cell span="8">
      <MultiSelect error errorMessage="This is an error message" />
    </Cell>
    <Cell span="4">
      <Heading appearance="H3">With various tags</Heading>
    </Cell>
    <Cell span="8">
      <MultiSelect
        tags={[
          { id: 1, label: 'Simple Text' },
          {
            id: 2,
            label: 'With thumb',
            thumb: (
              <div
                style={{
                  backgroundColor: 'green',
                  height: '100%',
                  width: '100%',
                }}
              />
            ),
          },
          { id: 3, label: 'Error theme', theme: 'error' },
          { id: 4, label: 'Warning theme', theme: 'warning' },
          { id: 5, label: 'Non-Removable', removable: false },
          { id: 6, label: 'Disabled', disabled: true },
          { id: 7, label: 'Size Large', size: 'large' },
          {
            id: 8,
            label: (
              <div style={{ width: '200px' }}>
                <Text ellipsis>
                  Long Label With Ellipsis To show The Full Label
                </Text>
              </div>
            ),
            // maxWidth: '200',
          },
        ]}
      />
    </Cell>
  </Layout>
);
