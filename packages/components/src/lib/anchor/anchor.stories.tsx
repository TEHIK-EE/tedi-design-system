import { ArgsTable, CURRENT_SELECTION, Description, Primary, Stories, Title } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';

import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import { Anchor, AnchorProps } from './anchor';

export default {
  component: Anchor,
  title: 'components/Anchor',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            Anchor component that should be always used when url is passed and a element should be rendered. If u need
            to use visually button, but still redirect as link use `type` prop. PS! U can not use disabled link button
            visuals.
          </Description>
          <Primary />
          <ArgsTable story={CURRENT_SELECTION} />
          <Stories title="Usecases" />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<AnchorProps> = (args) => {
  const { text = 'Link', url = '#' } = args;

  const getRow = (name: string, rowProps?: Omit<Partial<AnchorProps>, 'children' | 'notVisual'>): JSX.Element => (
    <Row gutterX={5} alignItems="center">
      <Col width={1} className={args.color === 'inverted' ? 'text-white' : undefined}>
        {name}
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Anchor {...args} {...rowProps} text={text} url={url} />
          </Col>
          <Col width="auto">
            <Anchor {...args} {...rowProps} text={text} url={url} iconRight="north_east" />
          </Col>
          <Col width="auto">
            <Anchor {...args} {...rowProps} text={text} url={url} icon="north_east" />
          </Col>
        </Row>
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Anchor {...args} {...rowProps} text={text} url={url} size="small" />
          </Col>
          <Col width="auto">
            <Anchor {...args} {...rowProps} text={text} url={url} iconRight="north_east" size="small" />
          </Col>
          <Col width="auto">
            <Anchor {...args} {...rowProps} text={text} url={url} icon="north_east" size="small" />
          </Col>
        </Row>
      </Col>
    </Row>
  );

  return (
    <VerticalSpacing size={0.5}>
      {getRow('Default')}
      {getRow('Hover', { isHovered: true })}
      {getRow('Active', { isActive: true })}
    </VerticalSpacing>
  );
};

export const Default = Template.bind({});
export const Inverted = Template.bind({});
Inverted.args = {
  color: 'inverted',
};
Inverted.parameters = {
  backgrounds: { default: 'black' },
};

export const TextColor = Template.bind({});
TextColor.args = {
  color: 'text-color',
};

export const AsPrimaryButton = Template.bind({});
AsPrimaryButton.args = {
  type: 'primary',
};
AsPrimaryButton.parameters = {
  docs: {
    description: {
      story:
        'You can render any visual button type as link because they share same visual and rendering logic in the back',
    },
  },
};

const NotVisualTemplate: Story<AnchorProps> = (args) => <Anchor {...args} />;

export const NotVisualAnchor = NotVisualTemplate.bind({});
NotVisualAnchor.args = {
  notVisual: true,
  text: 'neti.ee',
  url: 'https://www.neti.ee/',
  children: <img src="https://www.neti.ee/img/neti-logo-2015-1.png" alt="neti.ee" />,
  target: '_blank',
};
NotVisualAnchor.parameters = {
  docs: {
    description: {
      story:
        'Use when u need to wrap link to some component for example logo img, that should not use same visual as other links.',
    },
  },
};
