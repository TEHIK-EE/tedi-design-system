import React from 'react';

import { useLabels } from '../../../../../../tedi/providers/label-provider';
import Anchor, { AnchorProps } from '../../../../anchor/anchor';
import styles from './logo.module.scss';

export interface LogoProps<H extends React.ElementType = 'a'> {
  /**
   * Url to logo
   * @default /logo.svg
   */
  imageUrl?: string;
  /**
   * Wrap logo with Anchor. Children are ignored.
   */
  anchorProps?: Partial<AnchorProps<H>>;
}

export const Logo = <H extends React.ElementType = 'a'>(props: LogoProps<H>) => {
  const { imageUrl = 'logo.svg', anchorProps } = props;
  const { getLabel } = useLabels();

  const LogoWrapper = anchorProps ? Anchor : React.Fragment;

  return (
    <div className={styles['header__logo']}>
      <LogoWrapper {...(anchorProps as AnchorProps<H>)}>
        <img src={imageUrl} alt={getLabel('header.logo')} className={styles['header__logo-image']} />
      </LogoWrapper>
    </div>
  );
};

export default Logo;
