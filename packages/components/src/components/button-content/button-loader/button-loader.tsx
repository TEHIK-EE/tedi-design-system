import cn from 'classnames';

import { IconProps } from '../../icon/icon';
import styles from './button-loader.module.scss';

export interface ButtonLoaderProps {
  /**
   * Additional custom class name.
   */
  className?: string;
  /**
   * Size of the LoaderIcon. Same as IconSize passed to Icon.
   * @default 16
   */
  size?: IconProps['size'];
  /**
   * Position of the LoaderIcon.
   */
  position?: 'absolute';
}

export const ButtonLoader = (props: ButtonLoaderProps): JSX.Element => {
  const { className, size = 16, position } = props;

  const loaderVariant = {
    '--loader-internal-variation-size': `${size / 16}rem`,
  } as React.CSSProperties;

  const loaderBEM = cn(styles['button-loader'], className, {
    [styles[`button-loader--${position}`]]: !!position,
  });

  return (
    <span className={loaderBEM} style={loaderVariant}>
      <svg viewBox="22 22 44 44">
        <circle
          className={styles['button-loader__inner']}
          cx="44"
          cy="44"
          r="20.2"
          fill="none"
          stroke-width="3.6"
        ></circle>
      </svg>
    </span>
  );
};

export default ButtonLoader;
