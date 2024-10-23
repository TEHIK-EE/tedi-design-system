import { StoryFn } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../../../../tedi/components/grid';
import { Icon } from '../../../icon/icon';
import { Tag } from '../../../tag/tag';
import { ISelectOption } from '../../select/select';
import HiddenField from '../hidden-field';

const selectOptions: ISelectOption[] = [
  { label: 'Abivajav laps', value: 'A' },
  { label: 'Abivajav täiskasvanu', value: 'B' },
  { label: 'Hädaohus olev laps', value: 'C' },
];

export const HiddenSelect: StoryFn<typeof HiddenField> = (args) => {
  const [state, setState] = React.useState(selectOptions[0]);

  return (
    <HiddenField
      content={
        <Row alignItems="end" gutter={2}>
          <Col width="auto">
            <Tag color="warning" type="secondary" iconOnly={true}>
              <Icon size={12} name="circle" filled />
            </Tag>
          </Col>
          <Col>{state?.label}</Col>
        </Row>
      }
      fieldType="select"
      fieldOptions={{
        id: 'example-2',
        label: 'Select',
        value: state,
        options: selectOptions,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: (value: any) => setState(value),
      }}
    />
  );
};
