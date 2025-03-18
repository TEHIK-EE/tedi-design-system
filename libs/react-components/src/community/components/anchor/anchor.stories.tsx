import { Meta, StoryFn, StoryObj } from '@storybook/react';
import Link from 'next/link';
import React, { ComponentProps, forwardRef } from 'react';

import { Col, Row } from '../../../tedi/components/layout/grid';
import { VerticalSpacing } from '../../../tedi/components/layout/vertical-spacing';
import Text from '../typography/text/text';
import { Anchor, AnchorProps } from './anchor';

const meta: Meta<AnchorProps> = {
  component: Anchor,
  title: 'Community/Anchor',
  parameters: {
    status: {
      type: ['deprecated', 'ExistsInTediReady'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Anchor>;

const Template: StoryFn<ComponentProps<typeof Anchor>> = (args) => {
  const getRow = (name: string, rowProps?: Partial<AnchorProps>): JSX.Element => (
    <Row gutterX={5} alignItems="center">
      <Col width={1}>
        <Text color={args.color === 'inverted' ? 'inverted' : undefined}>{name}</Text>
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Anchor {...args} {...rowProps}>
              Link
            </Anchor>
          </Col>
          <Col width="auto">
            <Anchor {...args} {...rowProps} iconRight="north_east">
              Link
            </Anchor>
          </Col>
          <Col width="auto">
            <Anchor {...args} {...rowProps} icon="north_east">
              Link
            </Anchor>
          </Col>
        </Row>
      </Col>
      <Col width="auto">
        <Row>
          <Col width="auto">
            <Anchor {...args} {...rowProps} size="small">
              Link
            </Anchor>
          </Col>
          <Col width="auto">
            <Anchor {...args} {...rowProps} iconRight="north_east" size="small">
              Link
            </Anchor>
          </Col>
          <Col width="auto">
            <Anchor {...args} {...rowProps} icon="north_east" size="small">
              Link
            </Anchor>
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

export const Default: Story = {
  render: Template,

  args: {
    children: 'Link',
    href: '#',
  },
};

export const Inverted: Story = {
  render: Template,

  args: {
    ...Default.args,
    color: 'inverted',
  },

  parameters: {
    backgrounds: { default: 'inverted' },
  },
};

export const TextColor: Story = {
  render: Template,

  args: {
    ...Default.args,
    color: 'text-color',
  },
};

/**
 * You can render any visual button type as link because they share same visual and rendering logic in the back
 */
export const AsPrimaryButton: Story = {
  render: Template,

  args: {
    ...Default.args,
    visualType: 'primary',
  },
};

/**
 * You can achieve the integration with third-party routing libraries with the `as` prop. In this example we pass in Next.js `<Link>` component.<br/>
 * If you don't want to pass the `as` prop every time you use Anchor, you can create a custom component that handles the logic in one place.<br/>
 * Just use that component every time you want to handle client side navigation.<br/>
 * When using `as` prop then typescript inherits the correct types from the component you pass into `as`.<br/>
 * There is one caveat to this that is explained in <a href="#anchors-as-properties">Anchors As Properties</a>
 */
export const CustomComponent: StoryObj<AnchorProps> = {
  render: () => {
    // reuse this function when you want to pass it into other components that accept Anchor props (E.g. Logo, Header etc)
    const LinkBehaviour = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof Link>>(
      ({ children, className, ...rest }, ref) => {
        return (
          <Link ref={ref} className={className} {...rest}>
            {children}
          </Link>
        );
      }
    );
    LinkBehaviour.displayName = 'LinkBehaviour';

    // reuse this component when you want to render <Anchor> in JSX. NB! Do not pass this to other components link(s) props.
    const CustomAnchor = (props: AnchorProps<typeof Link>) => {
      return <Anchor as={LinkBehaviour} {...props} />;
    };

    return (
      <Row justifyContent="around">
        <Col width="auto">
          <Anchor href="#">Plain link</Anchor>
        </Col>
        <Col width="auto">
          <Anchor as={LinkBehaviour} href={{ pathname: '/path', query: { personalCode: '1234567' } }}>
            Next.js link with custom logic
          </Anchor>
        </Col>
        <Col width="auto">
          <CustomAnchor href={{ pathname: '/path', query: { personalCode: '1234567' } }}>
            Wrapped Next.js link
          </CustomAnchor>
        </Col>
      </Row>
    );
  },
};

/**
 * Use when u need to wrap link to some component for example logo img, that should not use same visual as other links.
 */
export const NoStyleAnchor: Story = {
  args: {
    noStyle: true,
    href: 'https://www.neti.ee/',
    children: <img src="https://www.neti.ee/img/neti-logo-2015-1.png" alt="neti.ee" />,
    target: '_blank',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    href: '#',
    visualType: 'primary',
    children: 'Anchor that stretches',
  },
};

/**
 * When link text wraps to multiple lines, the icon should be inline with the text.
 */
export const LongText: Story = {
  args: {
    href: '#',
    iconRight: 'north_east',
    children: 'This is a very long link text that should wrap to multiple lines',
  },
};
