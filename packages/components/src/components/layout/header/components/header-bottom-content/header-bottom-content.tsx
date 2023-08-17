import cn from 'classnames';

import { Card, CardContent, CardProps } from '../../../../card';
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

  const BEM = cn(styles['header__bottom-content'], cardProps?.className);

  return (
    <Card padding={0.75} {...cardProps} className={BEM}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default HeaderBottomContent;
