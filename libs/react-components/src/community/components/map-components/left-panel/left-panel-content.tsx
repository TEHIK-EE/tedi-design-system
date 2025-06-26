import { JSX } from 'react';

import { Alert, Button, ButtonGroup, VerticalSpacing } from '../../../../tedi';
import { LeftPanelProps } from './left-panel';
import styles from './left-panel.module.scss';

type LeftPanelContentProps = LeftPanelProps & {
  children?: React.ReactNode;
};

const LeftPanelContent = ({
  showAlert = true,
  show2D3DButtons = true,
  children,
}: LeftPanelContentProps): JSX.Element => {
  return (
    <div className={styles['tedi-left-panel__content-wrapper']}>
      {showAlert ||
        (show2D3DButtons && (
          <div className={styles['tedi-left-panel__content']}>
            {showAlert && (
              <Alert className={styles['tedi-left-panel__alert']}>
                Kõikide sisselülitatud kihtide kuvamiseks tuleb sisse suumida.
              </Alert>
            )}

            <VerticalSpacing size={0.5}>
              {show2D3DButtons && (
                <ButtonGroup type="primary" stretch={true}>
                  <Button id="1" isActive iconLeft="checked">
                    2D
                  </Button>
                  <Button id="2">3D</Button>
                </ButtonGroup>
              )}
            </VerticalSpacing>
          </div>
        ))}
      {children}
    </div>
  );
};

export default LeftPanelContent;
