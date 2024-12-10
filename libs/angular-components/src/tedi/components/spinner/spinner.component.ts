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
  color?: SpinnerColor;
  position?: SpinnerPosition;
  className?: string;
  label?: string;
}

@Component({
  selector: 'app-spinner',
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
