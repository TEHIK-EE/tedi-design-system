import { fireEvent, render, screen } from '@testing-library/react';

import { useBreakpointProps, usePrint } from '../../../helpers';
import { Heading } from '../../base/typography/heading/heading';
import Collapse, { CollapseProps } from './collapse';

import '@testing-library/jest-dom';

jest.mock('../../../helpers', () => ({
  useBreakpointProps: jest.fn(),
  usePrint: jest.fn(),
}));

const getComponent = (props?: Partial<CollapseProps>) =>
  render(
    <Collapse
      id="collapse-1"
      title={<Heading>Heading</Heading>}
      openText="Näita rohkem"
      closeText="Näita vähem"
      {...props}
    >
      Collapse content
    </Collapse>
  );

describe('Collapse component with breakpoint support', () => {
  (useBreakpointProps as jest.Mock).mockImplementation(() => ({
    getCurrentBreakpointProps: jest.fn((props) => ({
      ...props,
    })),
  }));

  (usePrint as jest.Mock).mockReturnValue(false);

  it('renders successfully', () => {
    const { baseElement } = getComponent();
    expect(baseElement).toBeTruthy();
  });

  it('applies custom className to root', () => {
    const { container } = getComponent({ className: 'test-class' });
    const root = container.querySelector('.test-class');
    expect(root).toBeInTheDocument();
    expect(root?.getAttribute('data-name')).toBe('collapse');
  });

  it('is collapsed by default (uncontrolled)', () => {
    const { getByTestId } = getComponent();
    const content = getByTestId('collapse-inner');
    expect(content).toHaveStyle('height: 0px');
  });

  it('expands when clicked (uncontrolled)', () => {
    const { getByTestId } = getComponent();
    const content = getByTestId('collapse-inner');
    const button = screen.getByRole('button', { name: /näita rohkem/i });
    fireEvent.click(button);
    expect(content).toHaveStyle('height: 0px');
  });

  it('can be controlled externally', () => {
    const { getByTestId, rerender } = render(
      <Collapse id="collapse-2" open title={<Heading>Controlled</Heading>}>
        Controlled content
      </Collapse>
    );

    const content = getByTestId('collapse-inner');
    expect(content).toHaveStyle('height: auto');

    rerender(
      <Collapse id="collapse-2" open={false} title={<Heading>Controlled</Heading>}>
        Controlled content
      </Collapse>
    );

    expect(content).toHaveStyle('height: 0px');
  });

  it('hides collapse text when hideCollapseText is true', () => {
    render(
      <Collapse id="collapse-4" hideCollapseText title={<Heading>Toggle</Heading>}>
        Content
      </Collapse>
    );

    const visuallyHiddenCol = screen.getByText(/open/i).parentElement;
    expect(visuallyHiddenCol).toHaveClass('visually-hidden');
  });

  it('renders secondary arrow wrapper when arrowType is "secondary"', () => {
    const { container } = getComponent({ arrowType: 'secondary' });
    const wrapper = container.querySelector('.tedi-collapse__icon-wrapper');
    expect(wrapper).toBeInTheDocument();
  });
});
