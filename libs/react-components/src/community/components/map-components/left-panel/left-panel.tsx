import { JSX } from 'react';

import Resizer from '../resizer/resizer';
import styles from './left-panel.module.scss';
import LeftPanelContent from './left-panel-content';
import LeftPanelFooter from './left-panel-footer';
import LeftPanelHeader from './left-panel-header';

export interface LeftPanelProps {
  showAlert?: boolean;
  show2D3DButtons?: boolean;
  children?: React.ReactNode | React.ReactNode[];
}

export const LeftPanel = (props: LeftPanelProps): JSX.Element => {
  return (
    <Resizer minWidth={350} initialWidth={350} maxWidth={600}>
      <div className={styles['tedi-left-panel']}>
        <div className={styles['tedi-left-panel__actions']}>
          <LeftPanelHeader />
          <LeftPanelContent {...props}>{props.children}</LeftPanelContent>
        </div>
        <LeftPanelFooter />
      </div>
    </Resizer>
  );
};

export default LeftPanel;
