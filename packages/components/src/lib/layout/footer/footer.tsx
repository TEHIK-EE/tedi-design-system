import cn from 'classnames';

import Button, { ButtonProps } from '../../button/button';
import { Col, Row } from '../../grid';
import Icon from '../../icon/icon';
import { VerticalSpacing } from '../../vertical-spacing';
import styles from './footer.module.scss';

export interface FooterCategory {
  heading: string;
  links: ButtonProps[];
  icon?: string;
}

export interface FooterProps {
  /**
   * List of categories, maximum amount of categories is 3
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
}

export const Footer = (props: FooterProps): JSX.Element => {
  const { logo, categories } = props;

  return (
    <footer className={styles['footer']}>
      {categories.map((c, key) => (
        <FooterCategory {...c} key={key} />
      ))}
      {logo && <img className={styles['footer__logo']} src={logo.src} alt={logo.alt} style={logo.style} />}
    </footer>
  );
};

const FooterCategory = (props: FooterCategory): JSX.Element => {
  const { heading, links, icon } = props;
  return (
    <Row>
      {icon && (
        <Col width="auto" className={cn('text-white', styles['footer__category-icon'])}>
          <Icon name={icon} size={16} />
        </Col>
      )}
      <Col width="auto">
        <VerticalSpacing className={cn('text-small', styles['footer__category'])} size={0.5}>
          <p className="text-white">
            <b>{heading}</b>
          </p>
          {links.map((link, key) => (
            <p key={key}>
              <Button
                className={styles['footer__link']}
                type="link"
                color="inverted"
                size="small"
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
