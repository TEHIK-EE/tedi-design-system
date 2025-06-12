import { LoadingIndicatorProps } from 'react-select';

import { UnknownType } from '../../../../types/commonTypes';
import { Spinner } from '../../../loaders/spinner/spinner';
import Separator from '../../../misc/separator/separator';
import styles from '../select.module.scss';

export const SelectLoadingIndicator = (props: LoadingIndicatorProps<UnknownType, boolean>) => {
  return (
    <div className={styles['tedi-select__loading-indicator']} {...props.innerProps}>
      <Spinner />
      <Separator color="primary" axis="vertical" className={styles['tedi-select__separator']} />
    </div>
  );
};
