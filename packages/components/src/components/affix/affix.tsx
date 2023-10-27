import cn from 'classnames';
import debounce from 'lodash-es/debounce';
import React from 'react';

import { LayoutContext } from '../layout';
import styles from './affix.module.scss';

export type AffixPosition = 0 | 0.5 | 1 | 1.5 | 2 | 'unset';

export interface AffixProps {
  /**
   * Affix children
   */
  children?: React.ReactNode;
  /**
   * Additional class.
   */
  className?: string;
  /**
   * Position of Affix.
   * @default 'sticky'
   */
  position?: 'sticky' | 'fixed';
  /**
   *  Spacing from the top of the Container.
   * @default 1.5rem
   */
  top?: AffixPosition;
  /**
   *  Spacing from the bottom of the Container.
   * @default 'unset'
   */
  bottom?: AffixPosition;
  /**
   *  Spacing from the left of the Container.
   * @default 'unset'
   */
  left?: AffixPosition;
  /**
   *  Spacing from the right of the Container.
   * @default 'unset'
   */
  right?: AffixPosition;
  /**
   * Determine what element(s) the top/bottom values should be relative to
   * @default ['header']
   */
  relative?: Array<'header'> | 'window';
}

export const Affix = (props: AffixProps): JSX.Element => {
  const { children, relative = ['header'], className, position = 'sticky', top = 1.5, bottom, right, left } = props;
  const [affixHeight, setAffixHeight] = React.useState(0);
  const [windowsHeight, setWindowsHeight] = React.useState(0);
  const referenceElement = React.useRef<HTMLDivElement>(null);
  const { headerBottomSize } = React.useContext(LayoutContext);

  const availableHeight = windowsHeight - (relative.includes('header') ? headerBottomSize?.height ?? 0 : 0); // how much vertical space we have for the affix
  const topSpacing = (typeof top === 'number' ? top : 0) * 16;
  const bottomSpacing = (typeof bottom === 'number' ? bottom : 0) * 16;
  const affixHeightWithSpacing = affixHeight + topSpacing + bottomSpacing; // actual affix height with top and bottom spacing

  /**
   * When Affix is longer than window, then it has to be static.
   * Or it would not be accessible.
   */
  React.useEffect(() => {
    const resizeListener = () => {
      setWindowsHeight(window.innerHeight);
      setAffixHeight((referenceElement.current && referenceElement.current.clientHeight) || 0);
    };

    const debouncedResizeHandler = debounce(resizeListener, 50);

    window.addEventListener('resize', debouncedResizeHandler);
    resizeListener();

    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
      debouncedResizeHandler.cancel();
    };
  }, []);

  const BEM = cn(styles['affix'], className, styles[`affix--${position}`], {
    [styles['affix--static']]: affixHeightWithSpacing > availableHeight,
    [styles['affix--relative-to-header']]: relative.includes('header'),
    [styles[`affix--top-${top}`.replace('.', '-')]]: typeof top !== 'undefined',
    [styles[`affix--bottom-${bottom}`.replace('.', '-')]]: typeof bottom !== 'undefined',
    [styles[`affix--left-${left}`.replace('.', '-')]]: typeof left !== 'undefined',
    [styles[`affix--right-${right}`.replace('.', '-')]]: typeof right !== 'undefined',
  });

  return (
    <div ref={referenceElement} className={BEM}>
      {children}
    </div>
  );
};

export default Affix;
