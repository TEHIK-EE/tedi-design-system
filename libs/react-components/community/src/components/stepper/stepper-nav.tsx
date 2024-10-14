import cn from 'classnames';
import React from 'react';

import { useLabels } from '../../../../tedi/src/providers/label-provider';
import { useLayout } from '../../helpers';
import Icon from '../icon/icon';
import styles from './stepper.module.scss';
import { StepperContext } from './stepper-context';

export interface StepperNavItem {
  /**
   * ID of tab
   */
  id: string;
  /**
   * Label show on navigation
   */
  label: string;
  /**
   * Is step completed
   */
  completed: boolean;
  /**
   * The position of the step
   */
  index: number;
}

export interface StepperNavProps {
  /**
   * Navigation items
   */
  items: StepperNavItem[];
  /**
   * Navigation aria-label
   */
  ariaLabel: string;
  /**
   * Completed label, added only for screen-readers.
   * Defaults to "Completed".
   */
  completedLabel?: string;
  /**
   * Not Completed label, added only for screen-readers.
   * Defaults to "Not completed".
   */
  notCompletedLabel?: string;
}

export const StepperNav = (props: StepperNavProps): JSX.Element => {
  const { getLabel } = useLabels();
  const {
    items,
    ariaLabel,
    completedLabel = getLabel('stepper.completed'),
    notCompletedLabel = getLabel('stepper.not-completed'),
  } = props;
  const isMobileLayout = useLayout(['mobile']);

  const { activeStep, handleActiveStepChange, allowStepLabelClick } = React.useContext(StepperContext);

  const completedSteps = items.filter((item) => item.completed).map((item) => item.index);

  const isStepperNavItemDisabled = (item: StepperNavItem): boolean => {
    // StepLabelClick is boolean, enable or disable all steps
    if (typeof allowStepLabelClick === 'boolean') {
      return !allowStepLabelClick;
    } else if (allowStepLabelClick === 'completed') {
      // StepLabelClick is 'completed', enable only completed steps
      return !item.completed;
    } else if (allowStepLabelClick === 'completed-or-next') {
      /*
       * 'completed-or-next':
       * - allow navigation from labels if the step is completed
       * - allow navigation if the step is not completed and is the next step
       * - allow navigation if the step is next of the last completed step
       */
      if (item.completed) {
        return false;
      }

      if (item.index === activeStep + 1) {
        return false;
      }

      if (item.index === Math.max(...completedSteps) + 1) {
        return false;
      }
    }

    return true;
  };

  const StepperNavItem = (stepperItem: StepperNavItem): JSX.Element => {
    const { label, completed, index, id } = stepperItem;
    const isCurrent = index === activeStep;
    const isActive = index <= activeStep;
    const isDisabled = isStepperNavItemDisabled(stepperItem);
    const StepperNavItemBEM = cn(
      styles['stepper__nav-item'],
      { [styles['stepper__nav-item--disabled']]: isDisabled },
      { [styles['stepper__nav-item--active']]: isActive },
      { [styles['stepper__nav-item--completed']]: completed }
    );

    const StepperNavItemLabelBEM = cn(styles['stepper__nav-item-label'], {
      'visually-hidden': isMobileLayout && !isCurrent,
    });

    return (
      <li className={StepperNavItemBEM}>
        <button
          type="button"
          role="tab"
          aria-selected={isCurrent}
          aria-controls={id}
          className={styles['stepper__nav-item-inner']}
          onClick={() => handleActiveStepChange(index)}
          disabled={isDisabled}
        >
          <span className={styles['stepper__nav-item-counter']}>
            {completed && <Icon name="done" size={18} />}
            {!completed && index + 1}
          </span>
          <span className={StepperNavItemLabelBEM}>{label}</span>
          {completed && <span className="visually-hidden">{completedLabel}</span>}
          {!completed && !isCurrent && <span className="visually-hidden">{notCompletedLabel}</span>}
        </button>
        {isCurrent && <span className={styles['stepper__nav-item-arrow']} />}
      </li>
    );
  };

  return (
    <nav role="tablist" aria-label={ariaLabel}>
      <ol className={styles['stepper__nav']}>
        {items.map((item, key) => (
          <StepperNavItem key={key} {...item} />
        ))}
      </ol>
    </nav>
  );
};

export default StepperNav;
