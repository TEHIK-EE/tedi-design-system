import { Meta, StoryFn, StoryObj } from '@storybook/react';
import NextLink from 'next/link';
import { ElementType, forwardRef } from 'react';

import { Col, Row } from '../../grid';
import { Text, TextProps } from '../../typography/text/text';
import { VerticalSpacing } from '../../vertical-spacing';
import { Link, LinkProps } from './link';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2160-25385&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/76e0c0-link" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'TEDI-Ready/Components/Navigation/Link',
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

const linkStateArray = ['Default', 'Hover', 'Active', 'Focus'];
const Template: StoryFn<LinkProps<ElementType>> = (args) => <Link href="#" {...args} />;

export const Default = {
  render: Template,
  argTypes: {
    as: {
      control: false,
      table: {
        type: { summary: 'ElementType' },
      },
    },
  },
  args: {
    children: 'Link',
  },
};

type TemplateMultipleProps<Type = typeof linkStateArray> = LinkProps<'a'> & {
  array: Type;
  titleColor: TextProps['color'];
};

const TemplateColumn: StoryFn<TemplateMultipleProps> = (args) => {
  const { array, titleColor, ...buttonProps } = args;

  return (
    <>
      <VerticalSpacing size={1}>
        <Row>
          <Col md={1}></Col>
          <Col>
            <Text color={titleColor} modifiers="bold">
              Default
            </Text>
          </Col>
          <Col className="text-bold">
            <Text color={titleColor} modifiers="bold">
              Small
            </Text>
          </Col>
        </Row>
        {array.map((value, key) => (
          <Row key={key}>
            <Col md={1} className="display-flex align-items-center">
              <Text color={titleColor} modifiers="bold">
                {value}
              </Text>
            </Col>
            <Col className="display-flex align-items-center gap-3">
              <Link id={value} href="#" {...buttonProps}>
                Create
              </Link>
              <Link id={value} href="#" {...buttonProps} iconRight="arrow_right_alt">
                Continue
              </Link>
              <Link id={value} href="#" {...buttonProps} iconLeft="edit">
                Edit
              </Link>
            </Col>
            <Col className="display-flex align-items-center gap-3">
              <Link id={value} href="#" size="small" {...buttonProps}>
                Create
              </Link>
              <Link id={value} href="#" size="small" {...buttonProps} iconRight="arrow_right_alt">
                Continue
              </Link>
              <Link id={value} href="#" size="small" {...buttonProps} iconLeft="edit">
                Edit
              </Link>
            </Col>
          </Row>
        ))}
      </VerticalSpacing>
    </>
  );
};

export const DefaultUnderlined: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const NoUnderline: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
    underline: false,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const DefaultInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
    color: 'inverted',
    titleColor: 'white',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
    backgrounds: { default: 'brand' },
  },
};

export const NoUnderlineInverted: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
    color: 'inverted',
    titleColor: 'white',
    underline: false,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
    backgrounds: { default: 'brand' },
  },
};

export const AsPrimaryButton: StoryObj<TemplateMultipleProps> = {
  render: TemplateColumn,
  args: {
    array: linkStateArray,
    visualType: 'primary',
    underline: false,
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      active: '#Active',
      focus: '#Focus',
    },
  },
};

export const CustomComponent: StoryObj<LinkProps> = {
  render: () => {
    // reuse this function when you want to pass it into other components that accept Anchor props (E.g. Logo, Header etc)
    const LinkBehaviour = forwardRef<HTMLAnchorElement, React.ComponentProps<typeof NextLink>>(
      ({ children, className, ...rest }, ref) => {
        return (
          <NextLink ref={ref} className={className} {...rest}>
            {children}
          </NextLink>
        );
      }
    );
    LinkBehaviour.displayName = 'LinkBehaviour';

    // reuse this component when you want to render <Anchor> in JSX. NB! Do not pass this to other components link(s) props.
    const CustomAnchor = (props: LinkProps<typeof NextLink>) => {
      return <Link as={LinkBehaviour} {...props} />;
    };

    return (
      <Row justifyContent="around">
        <Col width="auto">
          <Link href="#">Plain link</Link>
        </Col>
        <Col width="auto">
          <Link as={LinkBehaviour} href={{ pathname: '/path', query: { personalCode: '1234567' } }}>
            Next.js link with custom logic
          </Link>
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

export const NoStyleLink = {
  args: {
    noStyle: true,
    href: 'https://www.tehik.ee/',
    children: <img width={200} src="tehik_logo.png" alt="tehik.ee" />,
    target: '_blank',
  },
};

export const FullWidth = {
  args: {
    fullWidth: true,
    href: '#',
    visualType: 'primary',
    children: 'Link that stretches',
    underline: false,
  },
};

export const LongText = {
  args: {
    href: '#',
    iconRight: 'north_east',
    children: 'This is a very long link text that should wrap into multiple lines',
  },
};
