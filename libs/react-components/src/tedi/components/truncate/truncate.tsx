import React, { ReactNode, useMemo, useState } from 'react';

import { useLabels } from '../../providers/label-provider';
import Button, { ButtonProps } from '../buttons/button/button';
import { Text } from '../typography/text/text';

export interface TruncateProps {
  /**
   * Text that will be truncated
   */
  children: string;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Maximum number of characters to display
   * @default 200
   */
  maxLength?: number;
  /**
   * Custom content to display at the end of truncated text
   * @default '...'
   */
  ellipsis?: ReactNode;
  /**
   * Whether the truncated text should be expandable
   * @default true
   */
  expandable?: boolean;
  /**
   * Override default button properties
   */
  button?: Partial<
    Omit<ButtonProps, 'onClick'> & { onClick: (e: React.MouseEvent<HTMLButtonElement>, isTruncated: boolean) => void }
  >;
}

export const Truncate = (props: TruncateProps): JSX.Element => {
  const { children, className, maxLength = 200, ellipsis = '...', expandable = true, button } = props;
  const { getLabel } = useLabels();

  const [isTruncated, setIsTruncated] = useState(true);
  const truncatedText = useMemo(() => {
    let slicedText = children.slice(0, maxLength);
    slicedText = slicedText.replace(/[^a-zA-Z0-9]+$/, '');
    return slicedText + ellipsis + ' ';
  }, [children, maxLength, ellipsis]);

  return (
    <Text element="span" color="secondary" className={className}>
      {isTruncated ? truncatedText : children}
      {expandable && (
        <Button
          style={{ display: isTruncated ? undefined : 'block' }}
          visualType="link"
          {...button}
          onClick={(e) => {
            button?.onClick?.(e, isTruncated);
            setIsTruncated((prev) => !prev);
          }}
        >
          {isTruncated ? getLabel('truncate.see-more') : getLabel('truncate.see-less')}
        </Button>
      )}
    </Text>
  );
};

export default Truncate;
