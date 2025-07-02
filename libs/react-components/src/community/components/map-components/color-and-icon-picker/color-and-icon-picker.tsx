import classNames from 'classnames';

import { Button, Icon, Label, LabelProps } from '../../../../tedi';
import MapDropdown, { MapDropdownItem } from '../map-dropdown/map-dropdown';
import styles from './color-and-icon-picker.module.scss';

interface VisualOption {
  /**
   * Unique identifier for the option. Used as the value submitted in forms and selected tracking.
   */
  value: string;
  /**
   * Optional human-readable label for the option.
   */
  label?: string;
  /**
   * Optional color value (hex, rgb, etc.), used only when type is `'color'`.
   */
  color?: string;
  /**
   * Optional icon name (from icon system), used only when type is `'icon'`.
   */
  icon?: string;
}

export interface ColorAndIconPickerProps {
  /**
   * Array of visual options to display in the selector.
   * Each option may include a value, label, color (for color type), or icon (for icon type).
   */
  options: VisualOption[];
  /**
   * Currently selected option's value.
   * This value is matched against the `options` array to determine which option is active.
   */
  selectedValue: string;
  /**
   * Callback function that is triggered when an option is selected.
   * Receives the selected option's value as a parameter.
   */
  onSelect: (value: string) => void;
  /**
   * Type of visual representation to render.
   * Can be either `'color'` (displays color swatches) or `'icon'` (displays icons).
   */
  type: 'color' | 'icon';
  /**
   * Optional custom class name to apply to the root element for additional styling.
   */
  className?: string;
  /**
   * Optional props passed to the label component.
   * Includes common label options like `children`, `required`, or `bold`.
   */
  label?: LabelProps;
  /**
   * Name for the hidden input field, used for form submission.
   * Also used to associate the label with the component.
   */
  name: string;
  layout?: 'row' | 'column';
  showLabels?: boolean;
  showInline?: boolean;
}

export const ColorAndIconPicker = (props: ColorAndIconPickerProps): JSX.Element => {
  const {
    options,
    selectedValue,
    onSelect,
    type,
    label,
    name,
    layout = 'row',
    showLabels = false,
    showInline = false,
  } = props;
  const selectedOption = options.find((opt) => opt.value === selectedValue) || options[0];

  const renderSelectedVisual = (option: VisualOption) => (
    <div
      className={classNames(styles['tedi-color-and-icon-picker__visual--selected'], {
        [styles['tedi-color-and-icon-picker__visual--none']]: option.value === 'none',
      })}
      style={type === 'color' ? { backgroundColor: option.color } : {}}
    >
      {type === 'icon' && option.icon && <Icon name={option.icon} />}
    </div>
  );

  const renderDropdownVisual = (option: VisualOption) => {
    return (
      <div
        className={styles['tedi-color-and-icon-picker__dropdown-item']}
        role="option"
        aria-selected={option.value === selectedValue}
      >
        <>
          {showLabels ? (
            <div className={styles['tedi-color-and-icon-picker__dropdown-item']}>
              {type === 'icon' && option.icon && (
                <Icon name={option.icon} className={styles['tedi-visual-option__icon']} />
              )}
              {option.label ?? option.value}
            </div>
          ) : (
            <div
              className={classNames(styles['tedi-color-and-icon-picker__visual'], {
                [styles['tedi-color-and-icon-picker__visual--active']]: option.value === selectedValue,
                [styles['tedi-color-and-icon-picker__visual--none']]: option.value === 'none',
                [styles[`tedi-color-and-icon-picker__visual--${type}`]]: type,
              })}
              style={option.value !== 'none' && type === 'color' ? { backgroundColor: option.color } : {}}
            >
              {type === 'icon' && option.icon && <Icon name={option.icon} color="secondary" />}
            </div>
          )}
        </>
      </div>
    );
  };

  const dropdownItems: MapDropdownItem[] = options.map((option) => ({
    children: renderDropdownVisual(option),
    onClick: () => onSelect(option.value),
    isActive: option.value === selectedValue,
  }));

  return (
    <>
      <Label htmlFor={name} {...label} />
      {showInline ? (
        <div
          className={classNames(
            styles['tedi-color-and-icon-picker__wrapper'],
            styles['tedi-color-and-icon-picker__inline'],
            styles[`tedi-color-and-icon-picker__layout--${layout}`]
          )}
          role="listbox"
          aria-labelledby={name}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={classNames(styles['tedi-color-and-icon-picker__visual'], {
                [styles['tedi-color-and-icon-picker__visual--active']]: option.value === selectedValue,
                [styles['tedi-color-and-icon-picker__visual--none']]: option.value === 'none',
                [styles[`tedi-color-and-icon-picker__visual--${type}`]]: type,
              })}
              style={option.value !== 'none' && type === 'color' ? { backgroundColor: option.color } : {}}
              onClick={() => onSelect(option.value)}
              aria-selected={option.value === selectedValue}
              role="option"
            >
              {type === 'icon' && option.icon && (
                <Icon name={option.icon} className={styles['tedi-visual-option__icon']} />
              )}
            </button>
          ))}
        </div>
      ) : (
        <MapDropdown className={!showLabels ? styles['tedi-color-and-icon-picker__wrapper'] : ''} layout={layout}>
          <MapDropdown.Trigger>
            <Button
              className={styles['tedi-color-and-icon-picker']}
              aria-haspopup="listbox"
              aria-expanded="false"
              noStyle
            >
              {renderSelectedVisual(selectedOption)}
              <Icon name="arrow_drop_down" />
            </Button>
          </MapDropdown.Trigger>
          <MapDropdown.Content items={dropdownItems} />
        </MapDropdown>
      )}
      {name && <input type="hidden" name={name} value={selectedValue} />}
    </>
  );
};

export default ColorAndIconPicker;
