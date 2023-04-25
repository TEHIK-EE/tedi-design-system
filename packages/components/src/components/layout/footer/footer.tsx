import cn from 'classnames';
import React from 'react';

import { Text } from '../../../helpers';
import { AllowedHTMLTags } from '../../../helpers/polymorphic/types';
import { Anchor, AnchorProps } from '../../anchor/anchor';
import { Col, Row } from '../../grid';
import Icon, { IconProps } from '../../icon/icon';
import Print from '../../print/print';
import { VerticalSpacing } from '../../vertical-spacing';
import styles from './footer.module.scss';

export type FooterCategory<C extends React.ElementType = 'a'> = {
  /**
   * Category links
   * @deprecated, use elements instead - TEHVEER-104
   */
  links?: AnchorProps<C>[];
  /**
   * Category elements
   */
  elements?: React.ReactNode[];
  heading: string;
  icon?: string | IconProps;
  linkAs?: C;
};

type ConditionalTypesFooter<C extends React.ElementType = 'a'> =
  | {
      /**
       * Render all links as this component<br />
       * See [Anchor/CustomComponent](/?path=/docs/components-anchor--custom-component) for an example
       */
      linkAs: AllowedHTMLTags<C, 'a' | React.ComponentType<any>>;
      /**
       * Category links
       */
      categories: FooterCategory<C>[];
    }
  | {
      linkAs?: never;
      categories: FooterCategory<any>[];
    };

export type FooterProps<C extends React.ElementType = 'a'> = ConditionalTypesFooter<C> & {
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

export const Footer = <C extends React.ElementType = 'a'>(props: FooterProps<C>): JSX.Element => {
  const { logo, categories, className, linkAs, bottomElement, ...rest } = props;

  const BEM = cn(styles['footer'], className);

  return (
    <Print visibility="hide">
      <footer data-name="footer" {...rest} className={BEM}>
        <div className={styles['footer__inner']}>
          {categories.map((c, key) => (
            <FooterCategory linkAs={linkAs} {...c} key={key} />
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

const FooterCategory = <C extends React.ElementType = 'a'>(props: FooterCategory<C>): JSX.Element => {
  const { heading, links, linkAs, icon, elements } = props;

  const getIcon = (icon: string | IconProps) => {
    const defaultIconProps: Partial<IconProps> = { size: 16 };
    const iconProps: IconProps =
      typeof icon === 'string' ? { ...defaultIconProps, name: icon } : { ...defaultIconProps, ...icon };

    return <Icon {...iconProps} />;
  };

  return (
    <Row>
      {icon && (
        <Col width="auto" className={cn('text-white', styles['footer__category-icon'])}>
          {getIcon(icon)}
        </Col>
      )}
      <Col width="auto">
        <VerticalSpacing className={cn('text-small', styles['footer__category'])} size={0.5}>
          <p className="text-white">
            <b>{heading}</b>
          </p>
          {elements &&
            elements.map((item, key) => (
              <Text color="inverted" key={key} element="div">
                {item}
              </Text>
            ))}
          {!elements &&
            links &&
            links.map((link, key) => (
              <p key={key}>
                <Anchor
                  className={styles['footer__link']}
                  color="inverted"
                  size="small"
                  as={linkAs}
                  underline
                  {...link}
                />
              </p>
            ))}
        </VerticalSpacing>
      </Col>
    </Row>
  );
};

export default Footer;
