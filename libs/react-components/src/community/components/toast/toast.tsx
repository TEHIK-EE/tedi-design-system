import React from 'react';
import { Slide, toast, ToastContainer, ToastOptions } from 'react-toastify';

import { Notification, NotificationProps } from '../notification/notification';

import 'react-toastify/dist/ReactToastify.css';

const toastDefaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 6000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
  rtl: false,
  closeButton: false,
};

export const sendNotification = (props: NotificationProps, toastOptions?: ToastOptions) => {
  const mergedToastOptions = { ...toastDefaultOptions, ...toastOptions };
  const id = toast(
    () => (
      <Notification
        data-name="toast"
        {...props}
        onClose={() => {
          props.onClose?.();
          toast.dismiss(id);
        }}
      >
        {props.children}
      </Notification>
    ),
    mergedToastOptions
  );
};

export { ToastContainer };
