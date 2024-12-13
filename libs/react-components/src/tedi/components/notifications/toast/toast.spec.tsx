import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

describe('Toast Component', () => {
  test('renders a toast notification when sendNotification is called', async () => {
    render(<ToastContainer />);

    act(() => {
      toast('Default Toast Message');
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Default Toast Message')).toBeInTheDocument();
    });
  });

  test('closes the toast notification when close button is clicked', async () => {
    render(<ToastContainer />);

    act(() => {
      toast('Default Toast');
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: 'close' });
    act(() => {
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
