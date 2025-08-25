import cn from 'classnames';
import { components as ReactSelectComponents, InputProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

export const SelectInput = (props: InputProps<ISelectOption, boolean>): JSX.Element => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { instanceId } = props.selectProps;

    if (e.key === 'Tab') {
      const footer = document.getElementById(`${instanceId}-menu-footer`);
      const firstFocusable = footer?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        e.preventDefault();
        (e.currentTarget as HTMLInputElement).blur();
        firstFocusable.focus();
        return;
      }
    }

    props.onKeyDown?.(e);
  };

  return (
    <ReactSelectComponents.Input
      {...props}
      className={cn(props.className, styles['tedi-select__input'])}
      isHidden={props.selectProps.inputIsHidden !== undefined ? props.selectProps.inputIsHidden : props.isHidden}
      aria-required={props.selectProps.required}
      required={props.selectProps.required}
      onKeyDown={onKeyDown}
    />
  );
};
