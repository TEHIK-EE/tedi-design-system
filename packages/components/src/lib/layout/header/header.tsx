import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../providers/label-provider';
import { Button } from '../../button/button';
import SkipLinks, { SkipLinksProps } from '../../skip-links/skip-links';
import { LayoutContext } from '../layout-context';
import HeaderDropdown, { HeaderDropdownProps } from './components/header-dropdown/header-dropdown';
import styles from './header.module.scss';

export interface HeaderProps {
  languageSelection?: Required<Omit<HeaderDropdownProps, 'className'>>;
  roleSelection?: Required<Omit<HeaderDropdownProps, 'className'>>;
  skipLinks?: SkipLinksProps;
  logo?: string;
  onLogoutClick: () => void;
}

export const Header = (props: HeaderProps) => {
  const { getLabel } = useLabels();
  const { languageSelection, roleSelection, skipLinks, logo = '/logo.svg', onLogoutClick } = props;
  const { toggleMenu, menuOpen } = React.useContext(LayoutContext);

  return (
    <>
      {skipLinks && <SkipLinks {...skipLinks} />}
      <header className={styles['header']}>
        <Button
          icon={menuOpen ? 'close' : 'menu'}
          type="primary"
          text={menuOpen ? getLabel('header.close') : getLabel('header.open')}
          className={styles['header__toggle']}
          classNameIcon={styles['header__toggle-icon']}
          onClick={toggleMenu}
        />
        <img src={logo} alt="Logo" className={styles['header__logo']} />
        {languageSelection && <HeaderDropdown className={styles['header__language']} {...languageSelection} />}
        {roleSelection && <HeaderDropdown className={styles['header__role']} {...roleSelection} />}
        {roleSelection && (
          <HeaderDropdown
            className={cn(styles['header__role'], styles['header__role--mobile'])}
            dropdown={{
              ...roleSelection.dropdown,
              button: {
                ...roleSelection.dropdown.button,
                icon: 'account_circle_rounded',
                iconRight: '',
                text: roleSelection.label,
                className: styles['header__role-button'],
                classNameIcon: styles['header__role-icon-button'],
              },
            }}
          />
        )}
        <Button
          className={cn(styles['header__logout'], styles['header__logout--mobile'])}
          classNameIcon={styles['header__logout-icon']}
          icon="logout"
          type="link"
          text={getLabel('header.logout')}
          onClick={onLogoutClick}
        />
        <Button
          className={styles['header__logout']}
          type="link"
          text={getLabel('header.logout')}
          onClick={onLogoutClick}
        />
      </header>
    </>
  );
};

export default Header;
