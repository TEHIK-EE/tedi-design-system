import { Meta, StoryObj } from '@storybook/react';

import { Button, Card, Text, VerticalSpacing } from '../../../../tedi';
import { measurementContent } from './examples';
import RightPanel from './right-panel';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=427-91631&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof RightPanel> = {
  component: RightPanel,
  title: 'Community/Map components/RightPanel',
};

export default meta;
type Story = StoryObj<typeof RightPanel>;

export const Default: Story = {
  args: {
    defaultOpenItem: ['first'],
    items: [
      { id: 'first', title: 'Infopäring', content: measurementContent },
      {
        id: 'second',
        title: 'Mõõtmine',
        content: (
          <Card borderRadius={false} borderless>
            <Card.Content>Lorem ipsum dolor sit amet</Card.Content>
          </Card>
        ),
      },
    ],
  },
};

export const OneItem: Story = {
  args: {
    defaultOpenItem: ['first'],
    renderToggleButton: false,
    items: [
      {
        id: 'first',
        title: (
          <VerticalSpacing size={0.5}>
            <Text modifiers={['thin', 'h4']}>Infopäring</Text>
            <Button visualType="secondary" iconRight="north_east" size="small">
              Kaldaaerofotod
            </Button>
          </VerticalSpacing>
        ),
        content: measurementContent,
      },
    ],
  },
};
