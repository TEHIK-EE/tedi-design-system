import cn from 'classnames';
import React from 'react';

import TextField, { TextFieldProps } from '../textfield/textfield';
import styles from './textarea.module.scss';

export type TextAreaProps = TextFieldProps;

export const TextArea = (props: TextAreaProps): JSX.Element => {
  return (
    <TextField
      {...props}
      inputClassName={styles['textarea__input']}
      isTextArea={true}
      className={cn(styles['textarea'], props.className)}
    />
  );
};

export default TextArea;
