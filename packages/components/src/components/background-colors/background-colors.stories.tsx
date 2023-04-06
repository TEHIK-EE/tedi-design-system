import { Meta } from '@storybook/react';

import { Card } from '../card';
import CardContent from '../card/card-content/card-content';
import { TColorsBackground } from '../commonTypes';

export default {
  title: 'components/Background-colors',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const colors: TColorsBackground[] = [
  'bg-default',
  'bg-muted',
  'bg-subtle',
  'warning-highlight',
  'important-highlight',
  'positive-highlight',
  'primary-main',
  'primary-highlight-subtle',
  'primary-highlight',
];

export const BackgroundColors = () => {
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

export const DeprecatedColorsNaming = () => {
  return (
    <Card>
      {colorsDeprecated.map((i, index) => (
        <CardContent key={index} background={i}>
          <p>{i}</p>
        </CardContent>
      ))}
    </Card>
  );
};
