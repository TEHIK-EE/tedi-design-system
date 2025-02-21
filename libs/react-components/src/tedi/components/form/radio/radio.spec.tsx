import { fireEvent, render } from '@testing-library/react';

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
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" hideLabel />
    );

    const span = container.querySelector('span');
    expect(span).toHaveClass('visually-hidden');
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
        id="radio-id"
        label="Radio Label"
        value="radio-value"
        name="radio-group"
        extraContent={<div>Extra Content</div>}
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

  it('changes state when clicked if not controlled', () => {
    const { container } = render(
      <Radio id="radio-id" label="Radio Label" value="radio-value" name="radio-group" defaultChecked={false} />
    );

    const input = container.querySelector('input[type="radio"]');
    if (input) {
      fireEvent.click(input);
    }
    expect(input).toBeChecked();
  });

  it('does not change state when clicked if controlled', () => {
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
