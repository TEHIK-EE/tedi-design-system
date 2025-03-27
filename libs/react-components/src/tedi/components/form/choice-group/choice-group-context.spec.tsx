import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

import { ChoiceGroupContext } from './choice-group-context';

const TestComponent = () => {
  const context = useContext(ChoiceGroupContext);
  return (
    <div>
      <p data-testid="name">{context.name}</p>
      <p data-testid="inputType">{context.inputType}</p>
      <p data-testid="currentValue">{JSON.stringify(context.currentValue)}</p>
    </div>
  );
};

it('uses default ChoiceGroupContext values when no provider is present', () => {
  render(<TestComponent />);

  expect(screen.getByTestId('name')).toHaveTextContent('');
  expect(screen.getByTestId('inputType')).toHaveTextContent('radio');
  expect(screen.getByTestId('currentValue')).toHaveTextContent('[]');
});

it('renders default ChoiceGroupContext without a provider', () => {
  render(
    <ChoiceGroupContext.Consumer>
      {(context) => {
        expect(context).toEqual({
          name: '',
          inputType: 'radio',
          onChange: expect.any(Function),
          currentValue: [],
        });
        return null;
      }}
    </ChoiceGroupContext.Consumer>
  );
});
