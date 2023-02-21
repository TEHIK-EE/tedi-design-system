import { Story } from '@storybook/react';
import React from 'react';

import { Col } from '../../../grid/col';
import { Row } from '../../../grid/row';
import { Tag } from '../../../tag/tag';
import { HiddenField } from '../hidden-field';

const keywords = [
  { label: 'Hooldusõigus', value: 'A' },
  { label: 'Käitumisprobleemid', value: 'B' },
  { label: 'Koolikiusamine', value: 'C' },
  { label: 'Variant D', value: 'D' },
  { label: 'Variant E', value: 'E' },
  { label: 'Variant F', value: 'F' },
];

export const HiddenMultiselect: Story = (args) => {
  const [state, setState] = React.useState([keywords[0], keywords[1], keywords[2]]);

  return (
    <HiddenField
      content={
        <Row gutter={2}>
          {state.map((keyword, index) => (
            <Col key={index} width="auto">
              <Tag type="secondary">{keyword.label}</Tag>
            </Col>
          ))}
        </Row>
      }
      fieldType="select"
      fieldOptions={{
        id: 'example-3',
        label: 'Multiselect',
        multiple: true,
        value: state,
        options: keywords,
        closeMenuOnSelect: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: (value: any) => setState(value),
      }}
    />
  );
};
