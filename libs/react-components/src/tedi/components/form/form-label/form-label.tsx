import cn from 'classnames';

import { Label } from '../../label/label';
import styles from './form-label.module.scss';

export interface FormLabelProps {
  /**
   * The unique identifier for the input element that this label is associated with.
   * This ID should match the input element's `id` attribute to ensure accessibility.
   */
  id: string;
  /**
   * The text content of the label that describes the input field.
   */
  label: string;
  /**
   * Controls the visibility of the label.
   * Use `true` to hide the label visually while maintaining its space in the layout,
   * or use 'keep-space' to hide it without collapsing the space it occupies.
   */
  hideLabel?: boolean | 'keep-space';
  /**
   * Indicates whether the input field is required.
   * If set to `true`, the required indicator (if provided) will be displayed next to the label.
   */
  required?: boolean;
  /**
   * Additional className.
   */
  className?: string;
  /**
   * Renders the label as a `<span>` instead of a `<label>` element.
   * This is useful when the `Form` component already handles labels internally.
   */
  renderWithoutLabel?: boolean;
  /**
   * Specifies the size of the label text.
   * Options include 'small' for a smaller label size or 'default' for the standard size.
   * @default default
   */
  size?: 'small' | 'default';
  /**
   * Tooltip content to display when hovering over the info button.
   * If provided, an info button with a tooltip will be rendered.
   */
  tooltip?: string;
}

export const FormLabel = (props: FormLabelProps): JSX.Element => {
  const { label, hideLabel, required, id, renderWithoutLabel, size = 'default', className, tooltip, ...rest } = props;

  const FormLabelBEM = cn(
    styles['tedi-form-label'],
    styles[`tedi-form-label--${size}`],
    {
      [styles[`tedi-form-label--hidden${hideLabel === 'keep-space' ? '-keep-space' : ''}`]]: hideLabel,
    },
    className
  );

  return (
    <Label
      as={renderWithoutLabel ? 'span' : 'label'}
      className={FormLabelBEM}
      htmlFor={id}
      required={required}
      isSmall={size === 'small'}
      tooltip={tooltip}
      {...rest}
    >
      {label}
    </Label>
  );
};

export default FormLabel;
