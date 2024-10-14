import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../grid';
import { Icon } from '../icon/icon';
import { Text } from '../typography/text/text';
import { VerticalSpacing } from '../vertical-spacing';
import { TextGroup, TextGroupProps } from './text-group';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=45-30752&mode=dev)<br/>
 * [Zeroheight ↗](https://tedi.zeroheight.com/styleguide/s/118912/p/28835d-icons)
 */

const meta: Meta<typeof TextGroup> = {
  component: TextGroup,
  title: 'Tedi-ready/Content/TextGroup',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextGroup>;

const TemplateWithLayouts: StoryFn<TextGroupProps> = (args) => {
  return (
    <VerticalSpacing size={1.5}>
      <TextGroup type="vertical" {...args} />
      <TextGroup type="horizontal" labelWidth="150px" {...args} />
    </VerticalSpacing>
  );
};

const MultipleTextGroupsTemplate: StoryFn<TextGroupProps> = (args) => {
  const groups = [
    {
      labelWidth: '150px',
      items: [
        {
          label: 'Patient',
          value: (
            <>
              <Icon name="person" size={18} color="tertiary" />
              <Text>Mari Maasikas</Text>
            </>
          ),
        },
        {
          label: 'Address',
          value: (
            <>
              <Icon name="location_on" size={16} color="tertiary" />
              <Text>Tulbi tn 4, Tallinn, 23562, Estonia</Text>
            </>
          ),
        },
      ],
    },
    {
      labelWidth: '180px',
      items: [
        {
          label: 'Vaccine',
          value: <Text>Mari Maasikas</Text>,
        },
        {
          label: 'Next vaccination',
          value: <Text>Immunization finished</Text>,
        },
      ],
    },
    {
      labelWidth: '200px',
      items: [
        {
          label: 'Healthcare provider',
          value: <Text>SA Põhja-Eesti Regionaalhaigla</Text>,
        },
        {
          label: 'Healthcare specialist',
          value: <Text>Mart Mets</Text>,
        },
        {
          label: 'Document creation time',
          value: <Text>16.08.2023 14:51:48</Text>,
        },
      ],
    },
  ];

  return (
    <>
      {groups.map((group, groupIndex) => (
        <Row key={groupIndex}>
          <Col>
            {group.items.map((item, index) => (
              <TextGroup key={index} {...args} label={item.label} labelWidth={group.labelWidth} value={item.value} />
            ))}
          </Col>
        </Row>
      ))}
    </>
  );
};

const TemplateWithTypes: StoryFn<TextGroupProps> = (args) => {
  return (
    <Row>
      <Col>
        <TextGroup type="vertical" label="Accessibility" value={<Text>Visible to doctor and representative</Text>} />
        <TextGroup
          type="vertical"
          label="Accessibility"
          value={
            <>
              <Icon name="lock" size={16} color="tertiary" />
              <Text>Visible to doctor and representative</Text>
            </>
          }
        />
        <TextGroup type="vertical" label="Accessibility" value={<Text>Visible to doctor and representative</Text>} />
        <TextGroup
          type="vertical"
          label="Accessibility"
          value={<Text modifiers="bold">Visible to doctor and representative</Text>}
        />
      </Col>
    </Row>
  );
};

export const Default: Story = {
  render: TemplateWithLayouts,
  args: {
    label: 'Accessibility',
    value: <Text>Visible to doctor and representative</Text>,
  },
};

export const Types: Story = {
  render: TemplateWithTypes,
};

export const PositionType: Story = {
  render: TemplateWithLayouts,
  args: {
    label: 'Accessibility',
    value: <Text>Visible to doctor and representative</Text>,
  },
};

export const MultipleItemsWithLabelWidth: Story = {
  render: MultipleTextGroupsTemplate,
  args: {
    type: 'horizontal',
  },
};
