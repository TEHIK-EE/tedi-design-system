import cn from 'classnames';
import React from 'react';

import { FeedbackTextProps } from '../feedback-text/feedback-text';
import { TextField, TextFieldProps } from '../textfield/textfield';
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

export const TextArea = (props: TextAreaProps): JSX.Element => {
  const { className, showCounter = false, helper = [], characterLimit, onChange, ...rest } = props;
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
  const combinedHelpers = [
    ...(Array.isArray(helper) ? helper : [helper]),
    ...(showCounter && characterLimit
      ? [
          {
            type: 'hint',
            text: charCountHelper,
            position: 'right',
            className: cn(styles['tedi-textarea__character-count']),
          },
        ]
      : []),
  ];

  return (
    <TextField
      {...rest}
      data-name="textarea"
      inputClassName={styles['tedi-textarea__input']}
      isTextArea={true}
      className={cn(styles['tedi-textarea'], className)}
      value={value}
      onChange={handleInputChange}
      helper={combinedHelpers as FeedbackTextProps[]}
    />
  );
};

export default TextArea;
