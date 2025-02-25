import { Slide, toast, ToastContainer, ToastOptions } from 'react-toastify';

import { Alert, AlertProps } from '../alert/alert';

import 'react-toastify/dist/ReactToastify.css';

const toastDefaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 10000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
  rtl: false,
  closeButton: false,
};

export const sendNotification = (props: AlertProps, toastOptions?: ToastOptions) => {
  const mergedToastOptions = { ...toastDefaultOptions, ...toastOptions };
  const id = toast(
    () => (
      <Alert
        data-name="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        {...props}
        onClose={() => {
          props.onClose?.();
          toast.dismiss(id);
        }}
      >
        {props.children}
      </Alert>
    ),
    mergedToastOptions
  );
};

export { ToastContainer };
