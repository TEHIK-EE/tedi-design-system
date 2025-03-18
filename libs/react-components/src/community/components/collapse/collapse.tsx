import cn from 'classnames';
import React from 'react';
import AnimateHeight from 'react-animate-height';

import { Col, Row, RowProps } from '../../../tedi/components/layout/grid';
import Print from '../../../tedi/components/misc/print/print';
import { usePrint } from '../../../tedi/helpers';
import { useLabels } from '../../../tedi/providers/label-provider';
import Icon from '../icon/icon';
import { Text } from '../typography/text/text';
import styles from './collapse.module.scss';

export interface CollapseProps {
  /**
   * ID of the collapse
   */
  id: string;
  /**
   * Any content.
   */
  children: React.ReactNode;
  /**
   * Should Collapse be initially shown. Won't work with open and onToggle.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Should the Collapsed be open or closed.
   * Use to handle state outside of component, should use with onToggle prop.
   */
  open?: boolean;
  /**
   * Callback when Collapsed is toggled.
   * Use to handle state outside of component, should use with open prop.
   */
  onToggle?: (open: boolean) => void;
  /**
   * Any content to be rendered as the title of the Collapse.
   */
  title?: JSX.Element;
  /**
   * Name on the button to open the item.
   * @default getLabel('open')
   */
  openText?: string;
  /**
   * Name on the button to close the item.
   * @default getLabel('close')
   */
  closeText?: string;
  /**
   * Should collapse open/close toggle button render text
   * @default false
   */
  hideCollapseText?: boolean;
  /**
   * Custom class name.
   */
  className?: string;
  /**
   * Props for title row.
   */
  titleRowProps?: RowProps;
}

export const Collapse = (props: CollapseProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    id,
    children,
    className,
    openText = getLabel('open'),
    closeText = getLabel('close'),
    hideCollapseText = false,
    title,
    titleRowProps,
    defaultOpen,
    open,
    onToggle,
    ...rest
  } = props;
  const [isOpenState, setIsOpen] = React.useState(defaultOpen);
  const isPrint = usePrint();
  const isOpen = isPrint || (open !== undefined ? open : isOpenState);
  const BEM = cn(styles['collapse'], className, { [styles['collapse--is-open']]: isOpen });

  const onClick = () => {
    setIsOpen((prev) => !prev);
    onToggle?.(!isOpen);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if ((e.code === 'Enter' || e.code === 'Space') && !e.repeat) {
      e.preventDefault();
      onClick();
    }
  };

  const renderContent = <div className={styles['collapse__content']}>{children}</div>;

  return (
    <div data-name="collapse" {...rest} className={BEM}>
      <button
        type="button"
        data-name="collapse-trigger"
        className={styles['collapse__title']}
        aria-expanded={isOpen}
        aria-controls={id}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        <Row justifyContent="between" alignItems="center" wrap="nowrap" {...titleRowProps} element="span">
          {title && <Col>{title}</Col>}
          <Col width="auto">
            <Row element="span" alignItems="center" gutter={1}>
              <Print visibility="hide">
                <Col
                  width="auto"
                  className={cn({
                    'visually-hidden': hideCollapseText,
                  })}
                >
                  <Text element="span" color="primary">
                    {isOpen ? closeText : openText}
                  </Text>
                </Col>
              </Print>
              <Col width="auto">
                <Icon className={styles['collapse__icon']} name="expand_more" />
              </Col>
            </Row>
          </Col>
        </Row>
      </button>
      {isPrint ? (
        renderContent
      ) : (
        <AnimateHeight duration={300} id={id} height={isOpen ? 'auto' : 0} data-testid="collapse-inner">
          {renderContent}
        </AnimateHeight>
      )}
    </div>
  );
};

export default Collapse;
