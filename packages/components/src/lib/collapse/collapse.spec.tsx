import { fireEvent, render, screen } from '@testing-library/react';

import Collapse, { CollapseProps } from './collapse';

const getComponent = (props?: Partial<CollapseProps>) =>
  render(
    <Collapse
      id="collapse-1"
      heading={{ children: 'heading' }}
      openText="Näita rohkem"
      closeText="Näita vähem"
      {...props}
    >
      Collapse content
    </Collapse>
  );

describe('Collapse', () => {
  it('should render successfully', () => {
    const { baseElement } = getComponent();
    expect(baseElement).toBeTruthy();
  });

  it('adds className to collapse', () => {
    const { baseElement } = getComponent({ className: 'test-class' });
    const collapse = baseElement.getElementsByClassName('test-class');
    expect(baseElement.getElementsByClassName('test-class')).toHaveLength(1);
    expect(collapse[0].classList.contains('collapse')).toBe(true);
  });

  it('should be collapsed by default', () => {
    const { getByTestId } = getComponent();
    const content = getByTestId('collapse-inner');
    expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  it('should open when button clicked', () => {
    const { getByTestId } = getComponent();
    const content = getByTestId('collapse-inner');
    fireEvent.click(screen.getByRole('button', { name: /Heading/i }));
    expect(content).toHaveAttribute('aria-hidden', 'false');
  });
});
