/* istanbul ignore file */
import { StoryFn } from '@storybook/react';
import { OptionProps } from 'react-select';

import { Col, Row } from '../../../../../tedi/components/grid';
import { Text } from '../../../typography/text/text';
import Select, { ISelectOption } from '../select';

interface DescriptionData {
  id: string;
  title: string;
  description: string;
}

const searchResults: DescriptionData[] = [
  {
    id: '1',
    title: 'Access to health data',
    description: 'Doctors will be able to see your health data',
  },
  {
    id: '2',
    title: 'Access to medications and health data',
    description: 'Doctors will be able to see your medications and health data',
  },
  {
    id: '3',
    title: 'Access to all',
    description:
      'Doctors will be able to see all your information, including declaration of health and other medical info',
  },
];

export const CustomOptionSelectTemplate: StoryFn<typeof Select> = (args) => {
  const selectOptions: ISelectOption[] = searchResults.map((option) => ({
    label: option.title,
    value: option.id,
    customData: option,
  }));

  return <Select {...args} options={selectOptions} renderOption={(props) => <WithDescription {...props} />} />;
};

const WithDescription = (props: OptionProps<ISelectOption, boolean>): JSX.Element => {
  const { title, description }: DescriptionData = props.data.customData as DescriptionData;

  return (
    <Row gutterY={2}>
      <Col>
        <Text>{title}</Text>
        <Text color="secondary" modifiers="small">
          {description}
        </Text>
      </Col>
    </Row>
  );
};
