import cn from 'classnames';

import TextField, { TextFieldProps } from '../../../../tedi/components/form/textfield/textfield';
import styles from './textarea.module.scss';

export type TextAreaProps = TextFieldProps;

export const TextArea = (props: TextAreaProps): JSX.Element => {
  const { className, ...rest } = props;
  return (
    <TextField
      {...rest}
      data-name="textarea"
      inputClassName={styles['textarea__input']}
      isTextArea={true}
      className={cn(styles['textarea'], className)}
    />
  );
};

export default TextArea;
