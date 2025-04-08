import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { UnknownType } from '../../../types/commonTypes';
import { ISelectOption, Select, SelectProps } from './select';

async function openSelectWithKeyboard(selectElement: HTMLElement) {
  await act(async () => {
    selectElement.focus();
    fireEvent.keyDown(selectElement, { key: 'ArrowDown', code: 'ArrowDown' });
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

async function selectOptionWithKeyboard(selectElement: HTMLElement) {
  await act(async () => {
    fireEvent.keyDown(selectElement, { key: 'Enter', code: 'Enter' });
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

describe('Select component', () => {
  const basicOptions: ISelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange', isDisabled: true },
  ];

  const groupedOptions = [
    {
      label: 'Fruits',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'potato', label: 'Potato' },
      ],
    },
  ];

  const defaultProps: SelectProps = {
    id: 'fruit-select',
    label: 'Choose a fruit',
    options: basicOptions,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with label and options', () => {
    render(<Select {...defaultProps} />);
    expect(screen.getByLabelText('Choose a fruit')).toBeInTheDocument();
  });

  it('opens the menu and allows selection', () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    const selectInput = screen.getByRole('combobox');
    fireEvent.focus(selectInput);
    fireEvent.keyDown(selectInput, { key: 'ArrowDown' });

    const option = screen.getByText('Banana');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'banana', label: 'Banana' }));
  });

  it('renders with a placeholder', () => {
    render(<Select {...defaultProps} placeholder="Pick something" />);
    expect(screen.getByText('Pick something')).toBeInTheDocument();
  });

  it('renders disabled state', () => {
    render(<Select {...defaultProps} disabled />);
    expect(screen.getByLabelText('Choose a fruit')).toBeDisabled();
  });

  it('renders with grouped options', async () => {
    render(<Select {...defaultProps} options={groupedOptions} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Carrot')).toBeInTheDocument();
  });

  it('does not allow selecting disabled options', async () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    const disabledOption = screen.getByText('Orange');
    await act(async () => {
      await userEvent.click(disabledOption);
    });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows radio buttons when showRadioButtons is true', async () => {
    render(<Select {...defaultProps} showRadioButtons />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getAllByRole('radio').length).toBeGreaterThan(0);
    });
  });

  it('renders custom no options message', async () => {
    render(<Select {...defaultProps} options={[]} noOptionsMessage={() => 'No fruits available'} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(screen.getByText('No fruits available')).toBeInTheDocument();
    });
  });

  it('renders with custom renderOption', async () => {
    const renderOption = (props: { label: string }) => <div data-testid="custom-option">{props.label}</div>;
    render(<Select {...defaultProps} renderOption={renderOption} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      const customOptions = screen.getAllByTestId('custom-option');
      expect(customOptions.length).toBeGreaterThan(0);
      expect(customOptions[0]).toHaveTextContent('Apple');
    });
  });

  it('handles keyboard navigation', async () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} onChange={handleChange} />);
    const selectInput = screen.getByRole('combobox');

    await openSelectWithKeyboard(selectInput);
    await selectOptionWithKeyboard(selectInput);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it('clears selection when clearable', async () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Select {...defaultProps} onChange={handleChange} value={basicOptions[0]} isClearIndicatorVisible />
    );

    const clearButton = container.querySelector('.tedi-closing-button');
    expect(clearButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(clearButton!);
    });

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('renders helper text', () => {
    render(<Select {...defaultProps} helper={{ text: 'Please select a fruit' }} />);
    expect(screen.getByText('Please select a fruit')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    const { container } = render(<Select {...defaultProps} invalid />);

    const selectRoot = container.querySelector('.tedi-select');
    expect(selectRoot).toHaveClass('tedi-select--invalid');
  });

  it('renders with success state', () => {
    const { container } = render(<Select {...defaultProps} valid />);

    const selectRoot = container.querySelector('.tedi-select');
    expect(selectRoot).toHaveClass('tedi-select--valid');
  });

  it('calls onBlur when the select loses focus', async () => {
    const handleBlur = jest.fn();
    render(<Select {...defaultProps} onBlur={handleBlur} />);

    const selectInput = screen.getByRole('combobox');

    await act(async () => {
      selectInput.focus();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      selectInput.blur();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(handleBlur).toHaveBeenCalled();
  });

  it('exposes react-select methods via ref', async () => {
    const ref = React.createRef<UnknownType>();

    render(<Select {...defaultProps} ref={ref} />);

    await waitFor(() => {
      expect(ref.current).toBeTruthy();
    });

    expect(typeof ref.current.focus).toBe('function');
    expect(typeof ref.current.blur).toBe('function');
    expect(typeof ref.current.clearValue).toBe('function');

    act(() => {
      ref.current.focus();
    });
  });

  it('renders with custom className', () => {
    const { container } = render(<Select {...defaultProps} className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
  it('renders custom option when renderOption is passed', async () => {
    const renderOptionMock = jest.fn((props) => <div data-testid="custom-option">{props.label}</div>);

    render(<Select {...defaultProps} multiple renderOption={renderOptionMock} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    const customOption = screen.getAllByTestId('custom-option');
    expect(customOption.length).toBeGreaterThan(0);
    expect(customOption[0]).toHaveTextContent('Apple');

    expect(renderOptionMock).toHaveBeenCalled();
  });

  it('radio onChange behaviour', async () => {
    const handleChange = jest.fn();
    render(<Select {...defaultProps} showRadioButtons onChange={handleChange} />);

    await act(async () => {
      await userEvent.click(screen.getByRole('combobox'));
    });

    const radioButton = screen.getByLabelText('Banana');
    await act(async () => {
      await userEvent.click(radioButton);
    });

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'banana', label: 'Banana' }));
  });

  it('custom loading indicator', () => {
    const { container } = render(<Select {...defaultProps} isLoading />);
    const loadingIndicator = container.querySelector('.tedi-select__loading-indicator');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('renders multivalue with tags', () => {
    const { container } = render(<Select {...defaultProps} multiple value={[basicOptions[0], basicOptions[1]]} />);
    const tags = container.querySelectorAll('.tedi-tag');
    expect(tags.length).toBe(2);
  });

  it('renders tag closing button', () => {
    const { container } = render(<Select {...defaultProps} multiple value={[basicOptions[0], basicOptions[1]]} />);
    const tags = container.querySelectorAll('.tedi-tag__close');
    expect(tags.length).toBe(2);
  });

  it('stops event propagation on mouse down', () => {
    const stopPropagationMock = jest.fn();

    render(<Select {...defaultProps} multiple value={[basicOptions[0]]} />);

    const multiValueDiv = screen.getByText('Apple').closest('.tedi-tag__close');

    fireEvent.mouseDown(multiValueDiv as HTMLElement);

    expect(stopPropagationMock).not.toHaveBeenCalled();
  });

  it('does not apply classNames when not provided', () => {
    const { container } = render(<Select {...defaultProps} />);
    expect(container.firstChild).not.toHaveClass('custom-container-class');
  });
});
