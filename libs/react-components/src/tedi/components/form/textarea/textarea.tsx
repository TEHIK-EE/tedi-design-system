import cn from 'classnames';
import React from 'react';

import TextField, { TextFieldProps } from '../../../../tedi/components/form/textfield/textfield';
import styles from './textarea.module.scss';

export interface TextAreaProps extends TextFieldProps {
  /**
   * Whether to show a character counter below the textarea.
   */
  showCounter?: boolean;
  /**
   * Maximum number of characters allowed in the textarea.
   */
  characterLimit?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  showCounter = false,
  helper = [],
  characterLimit,
  onChange,
  ...rest
}): JSX.Element => {
  const [value, setValue] = React.useState<string>('');

  const handleInputChange = (inputValue: string) => {
    let truncatedValue = inputValue;

    if (characterLimit !== undefined) {
      truncatedValue = inputValue.slice(0, characterLimit);
    }

    setValue(truncatedValue);

    if (onChange) {
      onChange(truncatedValue);
    }
  };

  const charCount = value.length;
  const charCountHelper = showCounter && characterLimit ? `${charCount}/${characterLimit}` : '';

  return (
    <TextField
      {...rest}
      data-name="textarea"
      inputClassName={styles['tedi-textarea__input']}
      isTextArea={true}
      className={cn(styles['tedi-textarea'], className)}
      value={value}
      onChange={handleInputChange}
      helper={[...(Array.isArray(helper) ? helper : [helper]), { text: charCountHelper, position: 'right' }]}
    />
  );
};

export default TextArea;
