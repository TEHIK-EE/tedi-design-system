import { Meta } from '@storybook/react';

import { Card } from '../card';
import CardContent from '../card/card-content/card-content';
import { TColorsBackground } from '../commonTypes';

export default {
  title: 'components/Color',
} as Meta;

const colors: TColorsBackground[] = [
  'white',
  'background-light',
  'background',
  'background-dark',
  'warning-light',
  'success-light',
  'error-light',
  'primary-1',
  'primary-2',
  'primary-3',
  'primary',
];

export const BackgroundColors = () => {
  return (
    <Card>
      {colors.map((i, index) => (
        <CardContent key={index} background={i}>
          <p className="text-capitalize">{i}</p>
        </CardContent>
      ))}
    </Card>
  );
};
