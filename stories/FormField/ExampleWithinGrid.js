import React from 'react';

import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import { Container, Row, Col } from 'wix-style-react/Grid';
import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';

const verticalAlignColStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
};

export default () => (
  <MessageBoxFunctionalLayout
    title="User Details"
    confirmText="Save"
    cancelText="Cancel"
  >
    <Container fluid>
      <Row stretchViewsVertically>
        <Col span={3}>
          <span style={verticalAlignColStyle}>
            <FormField
              dataHook="storybook-formfield-grid"
              label="User"
              required
            />
          </span>
        </Col>
        <Col span={9}>
          <Input />
        </Col>
      </Row>
      <Row stretchViewsVertically>
        <Col span={3}>
          <span style={verticalAlignColStyle}>
            <FormField label="Email" />
          </span>
        </Col>
        <Col span={9}>
          <Input />
        </Col>
      </Row>
      <Row stretchViewsVertically>
        <Col span={3}>
          <span style={verticalAlignColStyle}>
            <FormField label="Address" infoContent="I help you to fill info" />
          </span>
        </Col>
        <Col span={9}>
          <Input />
        </Col>
      </Row>
    </Container>
  </MessageBoxFunctionalLayout>
);
