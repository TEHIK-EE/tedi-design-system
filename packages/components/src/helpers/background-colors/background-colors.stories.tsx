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
  'bg-default',
  'bg-muted',
  'bg-subtle',
  'warning-highlight',
  'important-highlight',
  'positive-highlight',
  'primary-highlight',
  'primary-highlight-subtle',
  'primary-main',
];

const colorsDeprecated: TColorsBackground[] = [
  'white',
  'background-light',
  'background',
  'warning-light',
  'success-light',
  'error-light',
  'primary-1',
  'primary-2',
  'primary',
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

export const DeprecatedColorsNaming: Story = {
  render: Template,

  args: {
    colors: colorsDeprecated,
  },
};
