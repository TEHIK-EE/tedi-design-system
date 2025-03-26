import { fireEvent, render, screen } from '@testing-library/react';

import { ChoiceGroupItemType } from '../../choice-group.types';
import { ChoiceGroupContext } from '../../choice-group-context';
import ChoiceGroupItem, { ExtendedChoiceGroupItemProps } from './choice-group-item';

describe('ChoiceGroupItem', () => {
  const defaultProps: ExtendedChoiceGroupItemProps = {
    id: 'test-id',
    label: 'Test Label',
    value: 'test-value',
    type: 'radio',
    variant: 'default',
    color: 'primary',
    showIndicator: false,
  };

  const renderWithContext = (
    props = {},
    contextValue = {
      currentValue: '',
      name: 'test-name',
      onChange: jest.fn(),
      inputType: 'radio' as ChoiceGroupItemType,
    }
  ) => {
    return render(
      <ChoiceGroupContext.Provider value={contextValue}>
        <ChoiceGroupItem {...defaultProps} {...props} />
      </ChoiceGroupContext.Provider>
    );
  };

  it('renders the radio input correctly', () => {
    renderWithContext();
    const radioInput = screen.getByRole('radio', { name: 'Test Label' });
    expect(radioInput).toBeInTheDocument();
  });

  it('renders the checkbox input correctly when type is checkbox', () => {
    renderWithContext({ type: 'checkbox' });
    const checkboxInput = screen.getByRole('checkbox', { name: 'Test Label' });
    expect(checkboxInput).toBeInTheDocument();
  });

  it('renders the card variant correctly', () => {
    renderWithContext({ variant: 'card' });
    const cardInput = screen.getByRole('radio', { name: 'Test Label' });
    expect(cardInput).toBeInTheDocument();
  });

  it('calls onChange handler when input is clicked', () => {
    const onChange = jest.fn();
    renderWithContext({ onChange }, { currentValue: '', name: 'test-name', onChange, inputType: 'radio' });
    const radioInput = screen.getByRole('radio', { name: 'Test Label' });
    fireEvent.click(radioInput);
    expect(onChange).toHaveBeenCalledWith('test-value', true);
  });

  it('renders with disabled state correctly', () => {
    renderWithContext({ disabled: true });
    const radioInput = screen.getByRole('radio', { name: 'Test Label' });
    expect(radioInput).toBeDisabled();
  });

  it('renders with helper text correctly', () => {
    const helper = { text: 'Helper text', className: 'helper-class' };
    renderWithContext({ helper });
    const helperText = screen.getByText('Helper text');
    expect(helperText).toBeInTheDocument();
  });

  it('renders with indicator when showIndicator is true', () => {
    renderWithContext({ showIndicator: true });
    const indicator = screen.getByTestId('choice-group-item-indicator');
    expect(indicator).toBeInTheDocument();
  });

  it('calls onChange handler when card input is clicked', () => {
    const onChange = jest.fn();
    renderWithContext(
      { variant: 'card', onChange },
      { currentValue: '', name: 'test-name', onChange, inputType: 'radio' }
    );
    const cardInput = screen.getByRole('radio', { name: 'Test Label' });
    fireEvent.click(cardInput);
    expect(onChange).toHaveBeenCalledWith('test-value', true);
  });

  it('renders the card variant with disabled state correctly', () => {
    renderWithContext({ variant: 'card', disabled: true });
    const cardInput = screen.getByRole('radio', { name: 'Test Label' });
    expect(cardInput).toBeDisabled();
  });

  it('renders the card variant with helper text correctly', () => {
    const helper = { text: 'Helper text', className: 'helper-class' };
    renderWithContext({ variant: 'card', helper });
    const helperText = screen.getByText('Helper text');
    expect(helperText).toBeInTheDocument();
  });
});
