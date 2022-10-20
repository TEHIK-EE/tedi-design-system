import { TColorsBackground } from '../commonTypes';
import styles from './colors.module.scss';

export const getBackgroundColorClass = (type?: TColorsBackground): string => {
  if (type) {
    return styles[`bg-${type}`];
  }
  return '';
};
