import { JSX } from 'react';

import styles from './editing-actions.module.scss';

interface EditingActionsProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const EditingActions = (props: EditingActionsProps): JSX.Element => {
  const { children } = props;
  return <div className={styles['tedi-editing-actions']}>{children}</div>;
};

export default EditingActions;
