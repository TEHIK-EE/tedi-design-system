import { Meta } from '@storybook/react';

import { Card } from '../../components/card';
import CardContent from '../../components/card/card-content/card-content';
import { TColorsBackground } from '../../components/commonTypes';

export default {
  title: 'components/helpers/Background-colors',
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
  'primary-highlight',
  'primary-highlight-subtle',
  'primary-main',
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
