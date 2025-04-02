import { render } from '@testing-library/react';

import { Label } from '../../content/label/label';
import { FormLabel } from './form-label';

import '@testing-library/jest-dom';

jest.mock('../../content/label/label', () => ({
  Label: jest.fn(({ children, className, as: Element = 'label', ...rest }) => {
    const { ...filteredRest } = rest;

    return (
      <Element className={className} isSmall {...filteredRest}>
        {children}
      </Element>
    );
  }),
}));

describe('FormLabel component', () => {
  it('renders with default props', () => {
    const { container } = render(<FormLabel id="test-id" label="Test Label" />);

    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Test Label');
    expect(label).toHaveAttribute('for', 'test-id');
    expect(label).not.toHaveClass('tedi-form-label--small');
  });

  it('renders with hideLabel as true', () => {
    const { container } = render(<FormLabel id="test-id" label="Test Label" hideLabel />);

    const label = container.querySelector('.tedi-form-label');
    expect(label).toHaveClass('tedi-form-label--hidden');
  });

  it('renders with hideLabel as "keep-space"', () => {
    const { container } = render(<FormLabel id="test-id" label="Test Label" hideLabel="keep-space" />);

    const label = container.querySelector('.tedi-form-label');
    expect(label).toHaveClass('tedi-form-label--hidden-keep-space');
  });

  it('renders with required prop', () => {
    const { container } = render(<FormLabel id="test-id" label="Test Label" required />);

    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(Label).toHaveBeenCalledWith(expect.objectContaining({ required: true }), expect.anything());
  });

  it('renders with a custom class name', () => {
    const { container } = render(<FormLabel id="test-id" label="Test Label" className="custom-class" />);

    const label = container.querySelector('.tedi-form-label');
    expect(label).toHaveClass('custom-class');
  });

  it('renders as span when renderWithoutLabel is true', () => {
    const { container } = render(<FormLabel id="test-id" label="Test Label" renderWithoutLabel />);

    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent('Test Label');
  });

  it('renders with small size', () => {
    const { container } = render(<FormLabel id="test-id" label="Test Label" size="small" />);

    const label = container.querySelector('.tedi-form-label');
    expect(label).toHaveClass('tedi-form-label--small');
  });

  it('renders with default size', () => {
    const { container } = render(<FormLabel id="test-id" label="Test Label" size="default" />);

    const label = container.querySelector('.tedi-form-label');
    expect(label).toHaveClass('tedi-form-label--default');
  });

  it('renders the label text correctly', () => {
    const { getByText } = render(<FormLabel id="test-id" label="Form Label Text" />);

    expect(getByText('Form Label Text')).toBeInTheDocument();
  });
});
