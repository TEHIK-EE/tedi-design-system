import cn from 'classnames';
import { components as ReactSelectComponents } from 'react-select';

import { UnknownType } from '../../../../types/commonTypes';
import styles from '../select.module.scss';

export const SelectValueContainer = ({ children, ...props }: UnknownType) => {
  return (
    <ReactSelectComponents.ValueContainer
      {...props}
      className={cn(styles['tedi-select__value-container'], props.className)}
    >
      {children}
    </ReactSelectComponents.ValueContainer>
  );
};
