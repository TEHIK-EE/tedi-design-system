import cn from 'classnames';
import React, { forwardRef } from 'react';

import { Button, ButtonProps } from '../../buttons/button/button';
import { IconWithoutBackgroundProps } from '../../icon/icon';
import { TextField, TextFieldForwardRef, TextFieldProps } from '../textfield/textfield';
import styles from './search.module.scss';

export interface SearchProps extends Omit<TextFieldProps, 'isTextArea' | 'icon' | 'onKeyPress'> {
  /**
   * Callback triggered when the search is executed (Enter key pressed or button clicked).
   */
  onSearch?: (value: string) => void;
  /**
   * Custom icon for the search input.
   */
  searchIcon?: string | IconWithoutBackgroundProps;
  /**
   * Optional button properties.
   */
  button?: Partial<ButtonProps>;
}

export const Search = forwardRef<TextFieldForwardRef, SearchProps>(
  (
    { placeholder, isClearable = true, searchIcon = 'search', onSearch, onChange, button, ...rest },
    ref
  ): JSX.Element => {
    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === 'Enter') {
        onSearch?.(rest.value as string);
      }
    };

    const handleButtonClick = () => {
      onSearch?.(rest.value as string);
    };

    const textFieldProps = {
      ...rest,
      ref,
      inputClassName: cn(styles['tedi-search__input'], button && styles['tedi-search__input--has-button']),
      placeholder,
      isClearable,
      onKeyPress: handleKeyPress,
      onChange,
      ...(button ? {} : { icon: searchIcon }),
    };

    return (
      <div className={cn(styles['tedi-search__wrapper'], rest.className)}>
        <TextField {...textFieldProps} />
        {button && (
          <Button
            {...button}
            onClick={handleButtonClick}
            className={cn(styles['tedi-search__button'], button.className)}
          >
            {button.children}
          </Button>
        )}
      </div>
    );
  }
);

Search.displayName = 'Search';
