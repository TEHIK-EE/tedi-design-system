import React from 'react';

import { HiddenField } from '../hidden-field';

export const HiddenTextField = () => {
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
