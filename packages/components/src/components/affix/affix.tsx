import cn from 'classnames';
import debounce from 'debounce';
import React from 'react';

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
}

export const Affix = (props: AffixProps): JSX.Element => {
  const { children, className, position = 'sticky', top = 1.5, bottom, right, left } = props;
  const [affixHeight, setAffixHeight] = React.useState(0);
  const [windowsHeight, setWindowsHeight] = React.useState(0);
  const referenceElement = React.useRef<HTMLDivElement>(null);

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
      debouncedResizeHandler.clear();
    };
  }, []);

  const BEM = cn(styles['affix'], className, styles[`affix--${position}`], {
    [styles['affix--static']]: affixHeight > windowsHeight,
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
