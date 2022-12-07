import { Meta, Story } from '@storybook/react';

import { Col, Row } from '../grid';
import Heading from '../heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Icon, IconProps } from './icon';

export default {
  title: 'components/Icon',
  component: Icon,
} as Meta;

export const Default: Story<IconProps> = (args) => {
  return (
    <div>
      <Icon {...args} />
    </div>
  );
};
Default.args = {
  name: 'home',
  size: 36,
};

export const Types: Story<IconProps> = (args) => {
  return (
    <VerticalSpacing size={0.5}>
      <Row alignItems="center" gutterX={5}>
        <Col width={1}>Outlined</Col>
        <Col width="auto">
          <Row gutterX={2}>
            <Col width="auto">
              <Icon {...args} name="home" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="cancel" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="block" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="close" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row alignItems="center" gutterX={5}>
        <Col width={1}>Filled</Col>
        <Col width="auto">
          <Row gutterX={2}>
            <Col width="auto">
              <Icon {...args} name="home" filled />
            </Col>
            <Col width="auto">
              <Icon {...args} name="cancel" filled />
            </Col>
            <Col width="auto">
              <Icon {...args} name="block" filled />
            </Col>
            <Col width="auto">
              <Icon {...args} name="close" filled />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row alignItems="center" gutterX={5}>
        <Col width={1}>Rounded</Col>
        <Col width="auto">
          <Row gutterX={2}>
            <Col width="auto">
              <Icon {...args} name="home" type="rounded" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="cancel" type="rounded" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="block" type="rounded" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="close" type="rounded" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row alignItems="center" gutterX={5}>
        <Col width={1}>Sharp</Col>
        <Col width="auto">
          <Row gutterX={2}>
            <Col width="auto">
              <Icon {...args} name="home" type="sharp" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="cancel" type="sharp" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="block" type="sharp" />
            </Col>
            <Col width="auto">
              <Icon {...args} name="close" type="sharp" />
            </Col>
          </Row>
        </Col>
      </Row>
    </VerticalSpacing>
  );
};
Types.args = {
  size: 36,
};
Types.parameters = {
  docs: {
    description: {
      story:
        'It is highly recommended to only use one `type` throughout your app. This ensures that only one icon font is downloaded.',
    },
  },
};

export const Sizes = () => {
  return (
    <div>
      <Icon name="home" size={12} />
      <Icon name="home" size={14} />
      <Icon name="home" size={18} />
      <Icon name="home" size={24} />
      <Icon name="home" size={36} />
      <Icon name="home" size={48} />
    </div>
  );
};

export const InText: Story<IconProps> = (args) => {
  return (
    <div>
      <div>
        <Heading level={1}>
          <Icon name={args.name} display="inline" weight={500} size={36} />
          This is level 2 heading with inline <Icon name={args.name} display="inline" weight={500} size={36} /> icon
        </Heading>
        <Heading level={2}>
          <Icon name={args.name} display="inline" weight={600} size={36} />
          This is level 2 heading with inline <Icon name={args.name} display="inline" weight={600} size={36} /> icon
        </Heading>
        <Heading level={3}>
          <Icon name={args.name} display="inline" weight={600} size={24} />
          This is level 3 heading with inline <Icon name={args.name} display="inline" weight={600} size={24} /> icon
        </Heading>
        <Heading level={4}>
          <Icon name={args.name} display="inline" weight={600} size={24} />
          This is level 4 heading with inline <Icon name={args.name} display="inline" weight={600} size={24} /> icon
        </Heading>
        <Heading level={5}>
          <Icon name={args.name} display="inline" weight={600} size={18} />
          This is level 5 heading with inline <Icon name={args.name} display="inline" weight={600} size={18} /> icon
        </Heading>
        <Heading level={6}>
          <Icon name={args.name} display="inline" weight={600} size={16} />
          This is level 6 heading with inline <Icon name={args.name} display="inline" weight={600} size={16} /> icon
        </Heading>
        <p>
          <Icon name={args.name} display="inline" weight={600} size={16} />
          This is paragraph text with inline <Icon name={args.name} display="inline" weight={600} size={16} /> icon
        </p>
        <small>
          <Icon name={args.name} display="inline" weight={600} size={16} />
          This is small text with inline <Icon name={args.name} display="inline" weight={600} size={16} /> icon
        </small>
      </div>
    </div>
  );
};
InText.args = {
  name: 'cancel',
};
InText.parameters = {
  docs: {
    description: {
      story: `Aligning icons with text can be achieved in two ways:<br/>
        a) Use \`<Row>\` and \`<Col>\` components and place icon and text in separate columns.<br/>
        b) Use \`inline={true}\` prop and place the icon as a text sibling. (Shown in this example)<br/>
        For both methods the \`size\` and \`weight\` of the icon should be manually set to visually match the text.
        Icon \`weight\` should be 2 steps larger than text weight and icon \`size\` should be rounded up from text size.
        E.g. When text has \`font-size: 32px\` and  \`font-weight: 300\`, then the icon should have \`size={36}\` and \`weight={500}\`
        `,
    },
  },
};
