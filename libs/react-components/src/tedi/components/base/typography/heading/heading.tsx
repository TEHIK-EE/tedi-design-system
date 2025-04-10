import { HeadingModifiers, Text, TextProps } from '../text/text';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = Omit<TextProps, 'element'> & {
  /**
   * Semantic heading tag
   * h1-h6 are allowed values
   * @default h1
   */
  element?: Extract<TextProps['element'], HeadingModifiers>;
};

export const Heading = (props: HeadingProps) => {
  const { children, element = 'h1', ...rest } = props;

  return (
    <Text element={element} {...rest}>
      {children}
    </Text>
  );
};
