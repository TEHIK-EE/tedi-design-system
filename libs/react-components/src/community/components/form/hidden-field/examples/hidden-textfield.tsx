import { StoryFn } from '@storybook/react';
import React from 'react';

import { HiddenField } from '../hidden-field';

export const HiddenTextField: StoryFn<typeof HiddenField> = (_args) => {
  const [state, setState] = React.useState('Vaba tekst');

  return (
    <HiddenField
      content={<p>{state}</p>}
      fieldType="textfield"
      fieldOptions={{
        id: 'example-1',
        label: 'Textfield',
        value: state,
        onChange: (value: string) => setState(value),
      }}
    />
  );
};
