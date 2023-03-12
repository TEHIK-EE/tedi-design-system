import { Meta, Story } from '@storybook/react';

import Button from '../button/button';
import { VerticalSpacing } from '../vertical-spacing';
import { Print, PrintProps } from './print';

export default {
  title: 'components/Print',
  component: Print,
  parameters: {
    docs: {
      description: {
        component: `Print component helps with modifying UI during printing. This can also be achieved using printing utility
          classes, but using this component is **preferred**`,
      },
    },
  },
} as Meta;

export const Default: Story<PrintProps> = (args) => {
  return (
    <VerticalSpacing>
      <Print {...args}>
        <p>Demo paragraph</p>
      </Print>
      <Print {...args}>
        <Button>Buttons are not printed by default</Button>
      </Print>
    </VerticalSpacing>
  );
};
