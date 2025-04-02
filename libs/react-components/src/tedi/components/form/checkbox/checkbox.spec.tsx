import { fireEvent, render, screen } from '@testing-library/react';
import { act, useState } from 'react';

import Checkbox from './checkbox';

import '@testing-library/jest-dom';

jest.mock('../../base/icon/icon', () => ({
  Icon: jest.fn(({ name }) => <span data-testid={`icon-${name}`}>{name}</span>),
}));

describe('Checkbox component', () => {
  it('renders with default props', () => {
    const { container } = render(<Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" />);

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it('renders with checked prop', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" defaultChecked />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeChecked();
  });

  it('renders with disabled prop', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" disabled />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeDisabled();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" onChange={handleChange} />
    );

    const input = container.querySelector('input[type="checkbox"]');
    if (input) {
      fireEvent.click(input);
    }
    expect(handleChange).toHaveBeenCalledWith('check-value', true);
  });

  it('renders with hideLabel prop', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" hideLabel />
    );

    const hiddenLabel = container.querySelector('label');

    expect(hiddenLabel).toBeInTheDocument();
    expect(hiddenLabel).toHaveClass('tedi-form-label--hidden');
  });

  it('renders with tooltip', () => {
    const { getByTestId } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" tooltip="Tooltip Text" />
    );

    expect(getByTestId('icon-info')).toBeInTheDocument();
  });

  it('renders with extra content', () => {
    const { getByText } = render(
      <Checkbox
        id="check-id"
        label="Check Label"
        value="check-value"
        name="check-group"
        helper={{ text: 'Extra Content' }}
      />
    );

    expect(getByText('Extra Content')).toBeInTheDocument();
  });

  it('handles defaultChecked correctly', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" defaultChecked />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toBeChecked();
  });

  it('changes state when clicked if not controlled', async () => {
    const TestComponent = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <Checkbox
          id="check-id"
          label="Check Label"
          value="check-value"
          name="check-group"
          defaultChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      );
    };

    render(<TestComponent />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(checkbox).toBeChecked();
  });

  it('does not change state when clicked if controlled', async () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Checkbox
        id="check-id"
        label="Check Label"
        value="check-value"
        name="check-group"
        checked={false}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(checkbox).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('check-value', true);

    rerender(
      <Checkbox
        id="check-id"
        label="Check Label"
        value="check-value"
        name="check-group"
        checked={true}
        onChange={handleChange}
      />
    );

    expect(checkbox).toBeChecked();
  });

  it('renders with indeterminate state', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" indeterminate />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toHaveAttribute('aria-checked', 'mixed');
    expect(input).not.toBeChecked();

    const indeterminateIcon = container.querySelector('.tedi-checkbox__indicator--indeterminate');
    expect(indeterminateIcon).toBeInTheDocument();
  });

  it('renders with indeterminate state and ignores checked', () => {
    const { container } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" checked indeterminate />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toHaveAttribute('aria-checked', 'mixed');
    expect(input).not.toBeChecked();
  });

  it('removes indeterminate state when clicked', () => {
    const { container, rerender } = render(
      <Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" indeterminate />
    );

    const input = container.querySelector('input[type="checkbox"]');
    expect(input).toHaveAttribute('aria-checked', 'mixed');

    if (input) {
      fireEvent.click(input);
    }

    rerender(<Checkbox id="check-id" label="Check Label" value="check-value" name="check-group" />);

    expect(input).not.toHaveAttribute('aria-checked', 'mixed');
  });

  it('calls labelRef.current.click() when clicked', () => {
    const { getByTestId } = render(
      <Checkbox id="check-id" label="Checkbox Label" value="check-value" name="check-group" />
    );

    const label = getByTestId('checkbox-label');
    const indicator = getByTestId('checkbox-indicator');

    jest.spyOn(label, 'click').mockImplementation(() => {});

    fireEvent.click(indicator);

    expect(label.click).toHaveBeenCalled();
  });
});
