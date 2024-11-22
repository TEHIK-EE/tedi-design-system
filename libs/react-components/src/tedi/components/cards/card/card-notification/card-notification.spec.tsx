import { render, screen } from '@testing-library/react';
import cn from 'classnames';

import { Alert } from '../../../alert/alert';
import CardNotification, { CardNotificationProps } from './card-notification';
import style from './card-notification.module.scss';

jest.mock('../../../alert/alert', () => ({
  Alert: jest.fn(({ children, className }) => <div className={className}>{children}</div>),
}));

jest.mock('../card-content/card-content', () => ({
  __esModule: true,
  default: jest.fn(({ children, className, 'data-name': dataName }) => (
    <div data-name={dataName} className={className}>
      {children}
    </div>
  )),
}));

describe('CardNotification', () => {
  const renderComponent = (props?: Partial<CardNotificationProps>) =>
    render(
      <CardNotification padding={1} className="custom-class" {...props}>
        Test Notification
      </CardNotification>
    );

  it('renders without crashing', () => {
    renderComponent();
    const notification = screen.getByText('Test Notification');

    expect(notification).toBeInTheDocument();
  });

  it('passes children to Alert', () => {
    renderComponent();
    const alert = screen.getByText('Test Notification');

    expect(alert).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    renderComponent({ className: 'extra-class' });
    const alert = screen.getByText('Test Notification');

    expect(alert).toHaveClass(cn(style['tedi-card__notification'], 'extra-class'));
  });

  it('applies noSideBorders prop to Alert', () => {
    renderComponent();
    expect(Alert).toHaveBeenCalledWith(
      expect.objectContaining({
        noSideBorders: true,
      }),
      {}
    );
  });

  it('passes additional props to Alert', () => {
    renderComponent({ type: 'success' });
    expect(Alert).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
      }),
      {}
    );
  });
});
