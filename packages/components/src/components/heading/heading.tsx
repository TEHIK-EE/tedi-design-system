export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps {
  /**
   * Heading children
   */
  children?: React.ReactNode;
  /**
   * Additional custom class.
   */
  className?: string;
  /**
   * ID attribute.
   */
  id?: string;
  /**
   * Heading level. 1-5 are allowed values.
   */
  level?: HeadingLevel;
}

export const Heading = (props: HeadingProps) => {
  const { children, className, id, level = 1 } = props;
  const Element = `h${level}` as const;

  return (
    <Element id={id} className={className}>
      {children}
    </Element>
  );
};

export default Heading;
