import { TColorsBackground } from '../commonTypes';
import styles from './background-colors.module.scss';

const colorsDeprecated: TColorsBackground[] = [
  'white',
  'background-light',
  'background',
  'warning-light',
  'success-light',
  'error-light',
  'primary-1',
  'primary-2',
  'primary',
];

export const getBackgroundColorClass = (type?: TColorsBackground): string => {
  if (type && colorsDeprecated.includes(type)) {
    switch (type) {
      case 'white':
        return styles['bg-default'];
      case 'background-light':
        return styles['bg-muted'];
      case 'background':
        return styles['bg-subtle'];
      case 'warning-light':
        return styles['warning-highlight'];
      case 'success-light':
        return styles['positive-highlight'];
      case 'error-light':
        return styles['important-highlight'];
      case 'primary-1':
        return styles['primary-highlight'];
      case 'primary-2':
        return styles['primary-highlight-subtle'];
      case 'primary':
        return styles['primary-main'];
    }
  } else if (type) {
    return styles[type];
  }

  return '';
};
