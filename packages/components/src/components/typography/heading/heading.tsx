import Text, { HeadingModifiers, TextProps } from '../text/text';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = Omit<TextProps, 'element'> & {
  /**
   * Heading level. 1-6 are allowed values.
   * @default 1
   * @deprecated - Use `element` prop
   */
  level?: HeadingLevel;
  /**
   * Semantic heading tag. h1-h6 are allowed values.
   * @default h1
   */
  element?: Extract<TextProps['element'], HeadingModifiers>;
};

export const Heading = (props: HeadingProps) => {
  const { children, element, level, ...rest } = props;
  const headingTag = element ?? (level ? (`h${level}` as const) : 'h1');

  return (
    <Text element={headingTag} {...rest}>
      {children}
    </Text>
  );
};

export default Heading;
