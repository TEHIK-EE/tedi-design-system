import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Button from '../../../community/components/button/button';
import { VerticalSpacing } from '../vertical-spacing';
import { Print, PrintProps } from './print';

/**
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/161c42-print" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Print> = {
  component: Print,
  title: 'TEDI-Ready/Components/Helpers/Print',
  parameters: {
    status: {
      type: ['devComponent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Print>;

const Template: StoryFn<PrintProps> = (args) => (
  <VerticalSpacing>
    <Print {...args}>
      <p>Demo paragraph</p>
    </Print>
    <Print {...args}>
      <Button>Buttons are not printed by default</Button>
    </Print>
  </VerticalSpacing>
);

export const Default: Story = {
  render: Template,
};
