import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Anchor from '../../../community/components/anchor/anchor';
import { VerticalSpacing } from '../vertical-spacing';
import Alert, { AlertProps } from './alert';

/**
 * [Figma ↗](https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4263-61880&m=dev)<br/>
 * [Zeroheight ↗](https://tedi.tehik.ee/1ee8444b7/p/63ede6-alert)
 */

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'TEDI-Ready/Components/Notifications/Alert',
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
type Story = StoryObj<typeof Alert>;

const alertTypes: { type: AlertProps['type']; icon: string }[] = [
  { type: 'info', icon: 'info' },
  { type: 'success', icon: 'check_circle' },
  { type: 'warning', icon: 'warning' },
  { type: 'danger', icon: 'error' },
];

const ColorsTemplate: StoryFn<AlertProps> = (args) => (
  <VerticalSpacing size={1}>
    {alertTypes.map(({ type, icon }) => (
      <Alert key={type} type={type} icon={icon} {...args}>
        <p>{`This is a ${type} alert.`}</p>
      </Alert>
    ))}
  </VerticalSpacing>
);

const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />;
export const Default: Story = {
  args: {
    title: 'Title',
    children: (
      <p>
        Content description. <Anchor href="#">Inline link example</Anchor>
      </p>
    ),
  },
};

const WithAndWithoutHeading: StoryFn<AlertProps> = (args) => {
  return (
    <VerticalSpacing size={1}>
      <Alert title="Title" {...args}>
        {args.children}
      </Alert>
      <Alert {...args}>{args.children}</Alert>
    </VerticalSpacing>
  );
};

export const Headless: Story = {
  render: Template,
  args: {
    children: <p>Content description</p>,
  },
};

export const Global: Story = {
  render: WithAndWithoutHeading,
  args: {
    children: <p>Content description</p>,
    isGlobal: true,
  },
};

export const WithoutSideBorders: Story = {
  render: WithAndWithoutHeading,
  args: {
    children: <p>Content description</p>,
    noSideBorders: true,
  },
};

export const WithIcon: Story = {
  render: WithAndWithoutHeading,
  args: {
    children: <p>Content description</p>,
    icon: 'check_circle',
  },
};

export const WithCloseButton: Story = {
  render: WithAndWithoutHeading,
  args: {
    children: <p>Content description</p>,
    onClose: () => null,
  },
};

export const AlertColors: Story = {
  render: ColorsTemplate,
  args: {
    children: <p>Content description</p>,
    onClose: () => null,
  },
};
