import { fireEvent, render, screen } from '@testing-library/react';
import { act, useState } from 'react';

import Radio from './radio';
import styles from './radio.module.css';

jest.mock('../../icon/icon', () => ({
  Icon: jest.fn(() => <span data-testid="icon">Icon</span>),
}));

describe('Radio component', () => {
  it('renders with default props', () => {
    const { container } = render(<Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" />);

    const input = container.querySelector('input[type="radio"]');
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
  });

  it('renders with checked prop', () => {
    const { container } = render(
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" defaultChecked />
    );

    const input = container.querySelector('input[type="radio"]');
    expect(input).toBeChecked();
  });

  it('renders with disabled prop', () => {
    const { container } = render(
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" disabled />
    );

    const input = container.querySelector('input[type="radio"]');
    expect(input).toBeDisabled();
  });

  it('calls onChange when clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" onChange={handleChange} />
    );

    const input = container.querySelector('input[type="radio"]');
    if (input) {
      fireEvent.click(input);
    }
    expect(handleChange).toHaveBeenCalledWith('radio-value', true);
  });

  it('renders with hideLabel prop', () => {
    const { container } = render(
      <Radio id="check-id" label="Check Label" value="check-value" name="check-group" hideLabel />
    );

    const hiddenLabel = container.querySelector('label');

    expect(hiddenLabel).toBeInTheDocument();
    expect(hiddenLabel).toHaveClass('tedi-form-label--hidden');
  });

  it('renders with tooltip', () => {
    const { getByTestId } = render(
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" tooltip="Tooltip Text" />
    );

    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('renders with extra content', () => {
    const { getByText } = render(
      <Radio
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
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" defaultChecked />
    );

    const input = container.querySelector('input[type="radio"]');
    expect(input).toBeChecked();
  });

  it('changes state when clicked if not controlled', async () => {
    const TestComponent = () => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <Radio
          id="radio-id"
          label="Radio Label"
          value="radio-value"
          name="radio-group"
          defaultChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      );
    };

    render(<TestComponent />);
    const radio = screen.getByRole('radio');

    expect(radio).not.toBeChecked();

    await act(async () => {
      fireEvent.click(radio);
    });

    expect(radio).toBeChecked();
  });

  it('does not change state when clicked if controlled', async () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <Radio
        id="radio-id"
        label="Radio Label"
        value="radio-value"
        name="radio-group"
        checked={false}
        onChange={handleChange}
      />
    );

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    await act(async () => {
      fireEvent.click(radio);
    });

    expect(radio).not.toBeChecked();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('radio-value', true);

    rerender(
      <Radio
        id="radio-id"
        label="Radio Label"
        value="radio-value"
        name="radio-group"
        checked={true}
        onChange={handleChange}
      />
    );

    expect(radio).toBeChecked();
  });

  it('calls onChange with correct parameters when input is clicked', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" onChange={handleChange} />
    );

    const input = container.querySelector('input[type="radio"]');
    if (input) {
      fireEvent.click(input);
    }
    expect(handleChange).toHaveBeenCalledWith('radio-value', true);
  });

  it('updates innerChecked state when input is clicked and component is uncontrolled', () => {
    const { container } = render(
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" defaultChecked={false} />
    );

    const input = container.querySelector('input[type="radio"]');
    if (input) {
      fireEvent.click(input);
    }
    expect(input).toBeChecked();
  });

  it('does not update innerChecked state when input is clicked and component is controlled', () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Radio
        id="radio-id"
        label="Radio Label"
        value="radio-value"
        name="radio-group"
        checked={false}
        onChange={handleChange}
      />
    );

    const input = container.querySelector('input[type="radio"]');
    if (input) {
      fireEvent.click(input);
    }
    expect(input).not.toBeChecked();
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with hover prop', () => {
    const { container } = render(
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" hover />
    );

    const indicator = container.querySelector(`.${styles['tedi-radio__indicator--hover']}`);
    expect(indicator).toBeInTheDocument();
  });

  it('calls labelRef.current.click() when clicked', () => {
    const { getByTestId } = render(<Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" />);

    const label = getByTestId('radio-label');
    const indicator = getByTestId('radio-indicator');

    jest.spyOn(label, 'click').mockImplementation(() => {});

    fireEvent.click(indicator);

    expect(label.click).toHaveBeenCalled();
  });
});
