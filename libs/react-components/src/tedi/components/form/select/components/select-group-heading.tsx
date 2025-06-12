import cn from 'classnames';
import { ReactElement } from 'react';
import { components as ReactSelectComponents, GroupHeadingProps } from 'react-select';

import { Text, TextProps } from '../../../base/typography/text/text';
import { IGroupedOptions, ISelectOption } from '../select';
import styles from '../select.module.scss';

type GroupHeadingType = GroupHeadingProps<ISelectOption, boolean, IGroupedOptions<ISelectOption>> & {
  optionGroupHeadingText?: Pick<TextProps, 'modifiers' | 'color'>;
};

export const SelectGroupHeading = ({ optionGroupHeadingText, ...props }: GroupHeadingType): ReactElement => {
  const textSettings = props.data.text || optionGroupHeadingText;

  return (
    <ReactSelectComponents.GroupHeading {...props} className={cn(styles['tedi-select__group-heading'])}>
      <Text {...textSettings}>{props.data.label}</Text>
    </ReactSelectComponents.GroupHeading>
  );
};
