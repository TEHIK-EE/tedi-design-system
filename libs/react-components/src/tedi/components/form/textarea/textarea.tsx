import cn from 'classnames';
import React, { forwardRef } from 'react';

import { FeedbackTextProps } from '../feedback-text/feedback-text';
import { TextField, TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './textarea.module.scss';

export interface TextAreaProps extends TextFieldProps {
  /**
   * Maximum number of characters allowed in the textarea.
   */
  characterLimit?: number;
}

export const TextArea = forwardRef<TextFieldForwardRef, TextAreaProps>((props, ref): JSX.Element => {
  const { className, helper = [], characterLimit, onChange, value: externalValue, defaultValue, ...rest } = props;
  const [innerValue, setInnerValue] = React.useState(defaultValue ?? '');

  const handleInputChange = React.useCallback(
    (inputValue: string) => {
      if (externalValue) {
        onChange?.(inputValue);
      } else {
        setInnerValue(inputValue);
      }
    },
    [externalValue, onChange]
  );

  const value = React.useMemo(() => externalValue ?? innerValue, [externalValue, innerValue]);
  const charCount = value.length;
  const charCountHelper = characterLimit ? `${charCount}/${characterLimit}` : '';
  const combinedHelpers = [
    ...(Array.isArray(helper) ? helper : [helper]),
    ...(characterLimit
      ? [
          {
            type: charCount > characterLimit ? 'error' : 'hint',
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
      ref={ref}
      data-name="textarea"
      inputClassName={styles['tedi-textarea__input']}
      isTextArea={true}
      className={cn(styles['tedi-textarea'], className)}
      value={value}
      onChange={handleInputChange}
      helper={combinedHelpers as FeedbackTextProps[]}
    />
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
