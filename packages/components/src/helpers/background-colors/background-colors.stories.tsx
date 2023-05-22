import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Card } from '../../components/card';
import CardContent from '../../components/card/card-content/card-content';
import { TColorsBackground } from '../../components/commonTypes';

const meta: Meta = {
  component: Card,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<TemplateProps>;

const colors: TColorsBackground[] = [
  // Primary
  'primary-main',
  'primary-active',
  'primary-active-subtle',
  'primary-highlight',
  'primary-highlight-subtle',
  // Accent
  'accent-main',
  'accent-highlight',
  // Foreground
  'bg-default',
  'bg-muted',
  'bg-subtle',
  'bg-disabled',
  'bg-inverted',
  'bg-inverted-contrast',
  // Shades
  'black',
  'white',
  // Functional colors - Positive
  'positive-main',
  'positive-active',
  'positive-highlight',
  'important-main',
  'important-active',
  'important-highlight',
  'info-main',
  'info-active',
  'info-highlight',
  'warning-main',
  'warning-highlight',
];

interface TemplateProps {
  colors: TColorsBackground[];
}
const Template: StoryFn<TemplateProps> = () => {
  return (
    <Card>
      {colors.map((i, index) => (
        <CardContent key={index} background={i}>
          <p>{i}</p>
        </CardContent>
      ))}
    </Card>
  );
};

export const BackgroundColors: Story = {
  render: Template,

  args: {
    colors,
  },
};
