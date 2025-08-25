import cn from 'classnames';
import { components as ReactSelectComponents, MenuProps } from 'react-select';

import { ISelectOption } from '../select';
import styles from '../select.module.scss';

type SelectMenuType = MenuProps<ISelectOption, boolean> & {
  renderMessageListFooter?: (props: MenuProps<ISelectOption, boolean>) => JSX.Element;
};

export const SelectMenu = ({ renderMessageListFooter, ...props }: SelectMenuType): JSX.Element => {
  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const { instanceId } = props.selectProps;

  return (
    <ReactSelectComponents.Menu
      {...props}
      className={cn(props.className, styles['tedi-select__menu'])}
      innerProps={{
        ...props.innerProps,
        onFocus: handleFocus,
      }}
    >
      {props.children}

      {renderMessageListFooter && (
        <div
          className={styles['tedi-select__menu-list-footer']}
          role="region"
          id={`${instanceId}-menu-footer`}
          tabIndex={-1}
        >
          {renderMessageListFooter(props)}
        </div>
      )}
    </ReactSelectComponents.Menu>
  );
};
