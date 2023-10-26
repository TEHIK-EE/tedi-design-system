import cn from 'classnames';
import React from 'react';

import { Card, CardContent, CardProps } from '../../../../card';
import { LayoutContext } from '../../../layout-context';
import styles from './header-bottom-content.module.scss';

export interface HeaderBottomContentProps {
  /**
   * Content of HeaderDropdown
   */
  children?: React.ReactNode;
  /**
   * card props to pass down to card component.
   */
  cardProps?: CardProps;
}

export const HeaderBottomContent = (props: HeaderBottomContentProps) => {
  const { children, cardProps } = props;
  const { headerBottomElement } = React.useContext(LayoutContext);

  const BEM = cn(styles['header__bottom-content'], cardProps?.className);

  return (
    <Card padding={0.75} {...cardProps} className={BEM} ref={headerBottomElement}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default HeaderBottomContent;
