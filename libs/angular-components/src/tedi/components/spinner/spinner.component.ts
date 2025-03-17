/* istanbul ignore file */
import { Component, Input } from '@angular/core';

type SpinnerSize = 10 | 16 | 18 | 48;
type SpinnerColor = 'primary' | 'secondary';
type SpinnerPosition = 'absolute';

export interface SpinnerProps {
  /**
   * Defines the size of the spinner. Accepted values: 10 (small), 16 (default), 48 (large).
   * @default 16
   */
  size?: SpinnerSize;
  /**
   * Specifies the color theme of the spinner.
   * The color should meet accessibility standards for color contrast.
   *
   * @default 'primary'
   */
  color?: SpinnerColor;
  /**
   * Sets the spinner's positioning behavior.
   * This is useful when you want to position the spinner over other elements.
   */
  position?: SpinnerPosition;
  /**
   * Adds a custom CSS class to the spinner element for additional styling or theming purposes.
   */
  className?: string;
  /**
   * Provides a text label for screen readers to announce the spinner's purpose or status.
   */
  label?: string;
}

@Component({
  selector: 'tedi-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements SpinnerProps {
  @Input() size: SpinnerSize = 16;
  @Input() color: SpinnerColor = 'primary';
  @Input() position?: SpinnerPosition;
  @Input() className?: string;
  @Input() label: string = 'Loading...';

  get spinnerClasses(): string {
    const classes = ['tedi-spinner'];
    if (this.className) classes.push(this.className);
    if (this.position) classes.push(`tedi-spinner--${this.position}`);
    classes.push(`tedi-spinner--size-${this.size}`);
    classes.push(`tedi-spinner--color-${this.color}`);
    return classes.join(' ');
  }
}
