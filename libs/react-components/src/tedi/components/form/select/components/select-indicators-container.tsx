import cn from 'classnames';
import { components as ReactSelectComponents } from 'react-select';

import { UnknownType } from '../../../../types/commonTypes';
import styles from '../select.module.scss';

export const SelectIndicatorsContainer = ({ children, ...props }: UnknownType): JSX.Element => {
  return (
    <ReactSelectComponents.IndicatorsContainer
      {...props}
      className={cn(styles['tedi-select__indicators-container'], props.className)}
    >
      {children}
    </ReactSelectComponents.IndicatorsContainer>
  );
};
