import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Label } from '../../content/label/label';
import { Col, Row } from '../../layout/grid';
import FormLabel from './form-label';

const meta: Meta<typeof FormLabel> = {
  component: FormLabel,
  title: 'TEDI-Ready/Components/Form/FormLabel',
  parameters: {
    status: {
      type: 'internalComponent',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormLabel>;

export const Default: Story = {
  args: {
    id: 'input-id-1',
    label: 'Label of input',
  },
};

const sizeArray = ['default', 'small'];

const SizeTemplate: StoryFn = () => {
  return (
    <div className="example-list">
      {sizeArray.map((size, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="display-flex w-50">
            <b>{size.charAt(0).toUpperCase() + size.slice(1)}</b>
          </Col>
          <Col className="display-flex gap-3">
            <Label isSmall={size === 'small'}>Label</Label>
            <Label isSmall={size === 'small'} isBold={true}>
              Label
            </Label>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export const Size = {
  render: SizeTemplate,
};

const StructureTemplate: StoryFn = () => {
  return (
    <Row cols={1} gap={3}>
      <Col>
        <Label>Active ingredient</Label>
      </Col>
      <Col>
        <Label required>Active ingredient</Label>
      </Col>
      <Col>
        <Label tooltip="Tooltip content">Active ingredient</Label>
      </Col>
      <Col>
        <Label required tooltip="Tooltip content">
          Active ingredient
        </Label>
      </Col>
    </Row>
  );
};

export const Structure = {
  render: StructureTemplate,
};
