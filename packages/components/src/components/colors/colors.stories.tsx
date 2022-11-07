import { Meta } from '@storybook/react';

import { Card } from '../card';
import CardContent from '../card/card-content/card-content';

export default {
  title: 'components/Color',
} as Meta;

export const BackgroundColors = () => {
  return (
    <Card>
      <CardContent background="white">White</CardContent>
      <CardContent background="background-light">Background-light</CardContent>
      <CardContent background="background">Background</CardContent>
      <CardContent background="background-dark">Background-dark</CardContent>
      <CardContent background="warning-light">Warning-light</CardContent>
      <CardContent background="error-light">Error-light</CardContent>
      <CardContent background="success-light">Success-light</CardContent>
    </Card>
  );
};
