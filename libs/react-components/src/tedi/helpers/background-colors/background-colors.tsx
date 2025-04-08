import { TColorsBackground } from '../../types/commonTypes';
import styles from './background-colors.module.scss';

export const getBackgroundColorClass = (type?: TColorsBackground): string => {
  if (type) {
    return styles[type];
  }

  return '';
};
