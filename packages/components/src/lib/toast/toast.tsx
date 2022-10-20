import React from 'react';
import { Slide, toast, ToastOptions } from 'react-toastify';

import { Notification, NotificationProps } from '../notification/notification';
import styles from './toast.module.scss';

const toastOptions: ToastOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
  rtl: false,
  closeButton: false,
};

export const sendNotification = (props: NotificationProps) => {
  const id = toast(
    <Notification
      className={styles['toast']}
      {...props}
      onClose={() => {
        props.onClose?.();
        toast.dismiss(id);
      }}
    >
      {props.children}
    </Notification>,
    toastOptions
  );
};
