import { Meta, StoryObj } from '@storybook/react';

import { Link, VerticalSpacing } from '../../../../tedi';
import Timeline from './timeline';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=135-19015&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  title: 'Community/Map components/Timeline',
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  args: {
    initialDate: new Date('2025-05-06T07:51:00'),
    minDate: new Date('2025-05-06T07:51:00'),
    maxDate: new Date('2025-12-30T01:39:00'),
    interval: 'week',
    popover: {
      children: (
        <VerticalSpacing>
          <Link>Autoriõiguste tekst 1</Link>
          <Link>Autoriõiguste tekst 2</Link>
          <Link>Autoriõiguste tekst 3</Link>
        </VerticalSpacing>
      ),
    },
  },
};

export const Vertical: Story = {
  args: {
    initialDate: new Date('2025-05-06T07:51:00'),
    minDate: new Date('2025-05-06T07:51:00'),
    maxDate: new Date('2025-12-30T01:39:00'),
    interval: 'week',
    vertical: true,
    popover: {
      children: (
        <VerticalSpacing>
          <Link>Autoriõiguste tekst 1</Link>
          <Link>Autoriõiguste tekst 2</Link>
          <Link>Autoriõiguste tekst 3</Link>
        </VerticalSpacing>
      ),
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '800px' }}>
        <Story />
      </div>
    ),
  ],
};
