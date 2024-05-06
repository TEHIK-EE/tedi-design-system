import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../../shared/providers/label-provider';
import { Col, Row } from '../../grid';
import Icon, { IconProps } from '../../icon/icon';
import Print from '../../print/print';
import StretchContent from '../../stretch-content/stretch-content';
import Text from '../../typography/text/text';
import { VerticalSpacing } from '../../vertical-spacing';
import styles from './footer.module.scss';

export type FooterCategory = {
  /**
   * Category elements
   */
  elements?: React.ReactNode[];
  heading: React.ReactNode;
  icon?: string | IconProps;
};

export type FooterProps = {
  /**
   * Footer Categorys
   */
  categories: FooterCategory[];
  /**
   * Src and styles of logo to show
   */
  logo?: {
    src: string;
    alt: string;
    style?: React.CSSProperties;
  };
  /**
   * Additional classname
   */
  className?: string;
  /**
   * Additional element to display in the bottom of the footer
   */
  bottomElement?: React.ReactNode;
};

export const Footer = (props: FooterProps): JSX.Element => {
  const { logo, categories, className, bottomElement, ...rest } = props;
  const { getLabel } = useLabels();

  const BEM = cn(styles['footer'], className);

  return (
    <Print visibility="hide">
      <footer data-name="footer" {...rest} className={BEM}>
        <Text className="visually-hidden" element="h2">
          {getLabel('footer.title')}
        </Text>
        <div className={styles['footer__inner']}>
          {categories.map((c, index) => (
            <StretchContent direction="vertical" key={index}>
              <FooterCategory {...c} />
            </StretchContent>
          ))}
          {logo && <img className={styles['footer__logo']} src={logo.src} alt={logo.alt} style={logo.style} />}
        </div>
        {bottomElement && (
          <Text color="inverted" element="div" className={styles['footer__bottom']}>
            {bottomElement}
          </Text>
        )}
      </footer>
    </Print>
  );
};

const FooterCategory = (props: FooterCategory): JSX.Element => {
  const { heading, icon, elements } = props;

  const getIcon = (icon: string | IconProps) => {
    const defaultIconProps: Partial<IconProps> = { size: 16 };
    const iconProps: IconProps =
      typeof icon === 'string' ? { ...defaultIconProps, name: icon } : { ...defaultIconProps, ...icon };

    return <Icon {...iconProps} />;
  };

  return (
    <Row>
      {icon && (
        <Col width="auto" className={cn('text-inverted', styles['footer__category-icon'])}>
          {getIcon(icon)}
        </Col>
      )}
      <Col width="auto">
        <VerticalSpacing className={cn('text-small', styles['footer__category'])} size={0.5}>
          <Text color="inverted" modifiers={['bold', 'normal']} element="h3">
            {heading}
          </Text>
          <VerticalSpacing element="ul" size={0.5} className={cn(styles['footer__category-list'])}>
            {elements?.map((item, index) => (
              <li key={index}>
                <Text color="inverted" element="span">
                  {item}
                </Text>
              </li>
            ))}
          </VerticalSpacing>
        </VerticalSpacing>
      </Col>
    </Row>
  );
};

export default Footer;
