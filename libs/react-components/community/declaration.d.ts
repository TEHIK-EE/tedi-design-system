import 'react';

declare module '*.module.scss' {
  const styles: { [key: string]: string };
  export default styles;
}

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}
