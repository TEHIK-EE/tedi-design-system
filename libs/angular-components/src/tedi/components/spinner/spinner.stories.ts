import { Meta, moduleMetadata, StoryFn, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpinnerComponent } from './spinner.component';

@Component({
  selector: 'spinner-list',
  template: `
    <div class="example-list" style="width: 50%;">
      <div *ngFor="let value of array; let i = index" class="row border-bottom padding-14-16">
        <div class="col">{{ value }}</div>
        <div class="col d-flex">
          <app-spinner [size]="value" [color]="color" [label]="label"></app-spinner>
        </div>
      </div>
    </div>
  `,
})
export class SpinnerListComponent {
  @Input() array: number[] = [];
  @Input() color: string = 'primary';
  @Input() label: string = 'Loading...';
}

@Component({
  selector: 'spinner-colors',
  template: `
    <div class="row align-items-center">
      <div class="col col-auto">
        <app-spinner [size]="size" color="primary" [label]="primaryLabel"></app-spinner>
      </div>
      <div class="col col-auto">
        <div class="bg bg-primary">
          <app-spinner [size]="size" color="secondary" [label]="secondaryLabel"></app-spinner>
        </div>
      </div>
      <div class="col col-auto">
        <div class="bg bg-danger">
          <app-spinner [size]="size" color="secondary" [label]="secondaryLabel"></app-spinner>
        </div>
      </div>
      <div class="col col-auto">
        <div class="bg bg-success">
          <app-spinner [size]="size" color="secondary" [label]="secondaryLabel"></app-spinner>
        </div>
      </div>
    </div>
  `,
})
export class SpinnerColorsComponent {
  @Input() size: number = 48;
  @Input() primaryLabel: string = 'Loading...';
  @Input() secondaryLabel: string = 'Loading...';
}

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2768-42334&mode=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/13d6ac-spinner" target="_BLANK">Zeroheight ↗</a>
 */

export default {
  title: 'TEDI-Ready Angular/Loader/Spinner',
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      declarations: [SpinnerComponent, SpinnerListComponent, SpinnerColorsComponent],
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    size: {
      control: 'radio',
      options: [10, 16, 48],
      description: 'Defines the size of the spinner. Accepted values: 10 (small), 16 (default), 48 (large).',
      defaultValue: 16,
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description:
        'Specifies the color theme of the spinner. The color should meet accessibility standards for color contrast.',
      defaultValue: 'primary',
    },
    label: {
      control: 'text',
      description: "Provides a text label for screen readers to announce the spinner's purpose or status.",
      defaultValue: 'Loading...',
    },
    className: {
      control: 'text',
      description: 'Adds a custom CSS class to the spinner element for additional styling or theming purposes.',
    },
    position: {
      control: 'object',
      description:
        "Sets the spinner's positioning behavior. This is useful when you want to position the spinner over other elements.",
    },
  },
} as Meta<SpinnerComponent>;

export const Default: StoryObj<SpinnerComponent> = {
  render: (args) => ({
    props: args,
  }),
  args: {
    size: 16,
    color: 'primary',
    label: 'Loading...',
  },
};

export const Size: StoryObj<SpinnerListComponent> = {
  render: (args) => ({
    template: `
      <spinner-list [array]="array" [color]="color" [label]="label"></spinner-list>
    `,
    props: args,
  }),
  args: {
    array: [10, 16, 48],
    color: 'primary',
    label: 'Loading...',
  },
  name: 'Spinner size',
};

export const Color: StoryObj<SpinnerColorsComponent> = {
  render: (args) => ({
    template: `
      <spinner-colors [size]="size" [primaryLabel]="primaryLabel" [secondaryLabel]="secondaryLabel"></spinner-colors>
    `,
    props: args,
  }),
  args: {
    size: 48,
    primaryLabel: 'Loading...',
    secondaryLabel: 'Loading...',
  },
  name: 'Spinner colors',
};
