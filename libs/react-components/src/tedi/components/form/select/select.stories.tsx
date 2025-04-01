import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { OptionsOrGroups } from 'react-select';

import { Col, Row } from '../../../../tedi/components/grid';
import { VerticalSpacing } from '../../../../tedi/components/vertical-spacing';
import { Text } from '../../typography/text/text';
import { AsyncSelectTemplate } from './examples/async';
import { CustomOptionSelectTemplate } from './examples/custom-option';
import { EditableSelectTemplate } from './examples/editable';
import { colourOptions, MultipleHandledTemplate } from './examples/multiple-handled';
import Select, { IGroupedOptions, ISelectOption } from './select';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4589-107311&m=dev" target="_BLANK">Figma ↗</a><br />
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/97a0a6-select" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'TEDI-Ready/Components/Form/Select',
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'tallinn', label: 'Tallinn' },
  { value: 'narva', label: 'Narva' },
  { value: 'tartu', label: 'Tartu', isDisabled: true },
  { value: 'elva', label: 'Elva' },
  { value: 'rakvere', label: 'Rakvere' },
  { value: 'haapsalu', label: 'Haapsalu' },
];

const groupedOptions: OptionsOrGroups<ISelectOption, IGroupedOptions<ISelectOption>> = [
  {
    label: 'American cities',
    options: [
      { value: 'new-york', label: 'New York' },
      { value: 'dallas', label: 'Dallas' },
    ],
  },
  {
    label: 'Estonian cities',
    options: [
      { value: 'tallinn', label: 'Tallinn' },
      { value: 'tartu', label: 'Tartu' },
    ],
  },
];

const TemplateSizes: StoryFn = (args) => (
  <Row>
    <Col lg={12} md={12} className="example-list">
      <Row className="border-bottom padding-14-16">
        <Col lg={2} md={12} className="display-flex align-items-center">
          <Text modifiers="bold">Default</Text>
        </Col>
        <Col lg={10} md={12}>
          <Select label={args.label} id="select-size-default" {...args} />
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col lg={2} md={12} className="display-flex align-items-center">
          <Text modifiers="bold">Small</Text>
        </Col>
        <Col lg={10} md={12}>
          <Select label={args.label} size="small" id="select-size-default" {...args} />
        </Col>
      </Row>
    </Col>
  </Row>
);

export const Default: Story = {
  args: {
    id: 'example-1',
    label: 'Label',
    defaultValue: options[1],
    options: options,
  },
};

export const Sizes: StoryObj<typeof TemplateSizes> = {
  render: TemplateSizes,
  args: {
    label: 'Label',
    options: options,
  },
};

export const States: Story = {
  args: {
    options: options,
    label: 'Label',
  },
  render: (args) => (
    <VerticalSpacing>
      <Row>
        <Col lg={2} md={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Default</Text>
        </Col>
        <Col>
          <Select {...args} id="example-default" />
        </Col>
      </Row>
      <Row>
        <Col lg={2} md={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Hover</Text>
        </Col>
        <Col>
          <Select
            {...args}
            id="example-hover"
            classNames={{
              control: 'pseudo-hover',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={2} md={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Focus</Text>
        </Col>
        <Col>
          <Select
            {...args}
            id="example-focus"
            classNames={{
              control: 'pseudo-focus',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={2} md={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Active</Text>
        </Col>
        <Col>
          <Select
            {...args}
            id="example-active"
            classNames={{
              control: 'pseudo-active',
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={2} md={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Error</Text>
        </Col>
        <Col>
          <Select {...args} helper={{ text: 'Error text', type: 'error' }} id="example-error" />
        </Col>
      </Row>
      <Row>
        <Col lg={2} md={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Success</Text>
        </Col>
        <Col>
          <Select {...args} helper={{ text: 'Valid text', type: 'valid' }} id="example-valid" />
        </Col>
      </Row>
      <Row>
        <Col lg={2} md={12} className="display-flex align-items-center gap-3">
          <Text modifiers="bold">Disabled</Text>
        </Col>
        <Col>
          <Select {...args} disabled id="example-disabled" />
        </Col>
      </Row>
    </VerticalSpacing>
  ),
};

export const MultipleSmall: Story = {
  args: {
    ...Default.args,
    id: 'example-multiple-small',
    size: 'small',
    multiple: true,
    defaultValue: undefined,
    placeholder: 'Placeholder',
  },
};

export const WithHint: Story = {
  args: {
    ...Default.args,
    id: 'with-hint-example',
    defaultValue: undefined,
    placeholder: 'Placeholder',
    helper: {
      text: 'Text hint',
      type: 'hint',
    },
  },
};

export const MultipleClosesOnSelect: Story = {
  args: {
    ...Default.args,
    id: 'example-multiple-closes-on-select',
    multiple: true,
    closeMenuOnSelect: true,
    blurInputOnSelect: true,
    defaultValue: undefined,
    placeholder: 'Placeholder',
  },
};

export const ClearIndicatorVisible: Story = {
  args: {
    ...Default.args,
    isClearIndicatorVisible: true,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
};

export const MultipleHandled: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'multiple-handled-example',
    label: 'Multiple Select',
    multiple: true,
  },
};

export const StackingTags: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'stacking-tags-example',
    label: 'Stacking Tags',
    defaultValue: colourOptions.filter((option) => !option.isDisabled),
    multiple: true,
    tagsDirection: 'stack',
  },
};

export const NonRemovableTags: Story = {
  render: MultipleHandledTemplate,
  args: {
    id: 'removable-tags-example',
    label: 'Removable Tags',
    defaultValue: colourOptions.filter((option) => !option.isDisabled),
    multiple: true,
    tagsDirection: 'stack',
    isTagRemovable: false,
  },
};

export const WithDescription: Story = {
  render: CustomOptionSelectTemplate,
  args: {
    label: 'With description',
    id: 'description-select',
  },
};

export const AsyncSelect: Story = {
  render: AsyncSelectTemplate,
  args: {
    id: 'async-example',
    label: 'Async label',
    async: true,
  },
};

export const EditableSelect: Story = {
  render: EditableSelectTemplate,
  args: {
    id: 'editable-example',
    label: 'Editable label',
  },
};

export const SelectWithGroupedOptions: Story = {
  args: {
    id: 'grouped-options-example',
    label: 'Grouped options label',
    options: groupedOptions,
  },
};
