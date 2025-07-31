import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MultiselectComponent } from "./multiselect.component";
import { SelectOptionComponent } from "./select-option.component";
import {
  IconComponent,
  FeedbackTextComponent,
} from "@tehik-ee/tedi-angular/tedi";

const meta: Meta<MultiselectComponent> = {
  title: "Community Angular/Form/Select/Multiselect",
  component: MultiselectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MultiselectComponent,
        SelectOptionComponent,
        FormsModule,
        ReactiveFormsModule,
        IconComponent,
        FeedbackTextComponent,
      ],
    }),
  ],
  argTypes: {
    inputId: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    placeholder: { control: "text" },
    state: { control: "radio", options: ["error", "valid", "default"] },
    size: { control: "radio", options: ["small", "default"] },
    multiRow: { control: "boolean" },
    clearableTags: { control: "boolean" },
    selectAll: { control: "boolean" },
    selectableGroups: { control: "boolean" },
    clearable: { control: "boolean" },
    feedbackText: {
      control: "object",
      description: "Feedback message configuration",
    },
    disabled: { control: "boolean" },
  },
  args: {
    inputId: "multiselect-1",
    label: "Custom multiselect label",
    required: false,
    placeholder: "Select options...",
    state: "default",
    size: "default",
    multiRow: false,
    clearableTags: false,
    selectAll: false,
    selectableGroups: false,
    clearable: true,
    feedbackText: {
      type: "hint",
      text: "Custom hint for using the multiselect",
      position: "left",
    },
    // disabled: false, // removed to avoid type error, can be set via controls
  },
};

export default meta;
type Story = StoryObj<MultiselectComponent>;

export const Multiselect: Story = {
  render: (args) => ({
    template: `
        <tedi-multiselect
          [inputId]="inputId"
          [placeholder]="placeholder"
          [label]="label"
          [feedbackText]="feedbackText"
          [required]="required"
          [state]="state"
          [size]="size"
          [multiRow]="multiRow"
          [clearableTags]="clearableTags"
          [selectAll]="selectAll"
          [selectableGroups]="selectableGroups"
          [clearable]="clearable"
          [disabled]="disabled"
        >
          <tedi-select-option value="option1" label="Option 1" />
          <tedi-select-option value="option2" label="Option 2" />
          <tedi-select-option value="option3" label="Option 3" />
          <tedi-select-option value="option4" label="Option 4" />
          <tedi-select-option value="option5" label="Option 5" />
        </tedi-multiselect>
    `,
    props: {
      ...args,
    },
  }),
};

export const multiselectPreselectedOptions: Story = {
  render: (args) => {
    const form = new FormGroup({
      selectedOptions: new FormControl(["option2", "option4"]),
    });
    return {
      props: {
        ...args,
        form,
      },
      template: `
        <form [formGroup]="form">
          <tedi-multiselect
            [inputId]="inputId"
            [placeholder]="placeholder"
            [label]="label"
            [feedbackText]="feedbackText"
            [required]="required"
            [state]="state"
            [size]="size"
            [multiRow]="multiRow"
            [clearableTags]="clearableTags"
            [selectAll]="selectAll"
            [selectableGroups]="selectableGroups"
            [clearable]="clearable"
            [disabled]="disabled"
            formControlName="selectedOptions"
          >
            <tedi-select-option value="option1" label="Option 1" />
            <tedi-select-option value="option2" label="Option 2" />
            <tedi-select-option value="option3" label="Option 3" />
            <tedi-select-option value="option4" label="Option 4" />
            <tedi-select-option value="option5" label="Option 5" />
          </tedi-multiselect>
        </form>

        <br />
        <strong>controlValueAccessor value:</strong> {{ form.controls.selectedOptions.value | json }}
      `,
    };
  },
};

export const MultiselectWithCustomOptions: Story = {
  render: (args) => ({
    template: `
        <tedi-multiselect
          [inputId]="inputId"
          [placeholder]="placeholder"
          [label]="label"
          [feedbackText]="feedbackText"
          [required]="required"
          [state]="state"
          [size]="size"
          [multiRow]="multiRow"
          [clearableTags]="clearableTags"
          [selectAll]="selectAll"
          [selectableGroups]="selectableGroups"
          [clearable]="clearable"
          [disabled]="disabled"
        >
          <tedi-select-option value="option1" label="Home">
            <tedi-icon name="home" /> Home
          </tedi-select-option>

          <tedi-select-option value="option2" label="Settings">
            <tedi-icon name="settings" /> Settings
          </tedi-select-option>

          <tedi-select-option value="option3" label="Account">
            <tedi-icon name="person" /> Account
          </tedi-select-option>

          <tedi-select-option value="option4" label="Notifications">
            <tedi-icon name="notifications" /> Notifications
            <div>
              <small>Manage your notification preferences</small>
            </div>
          </tedi-select-option>

          <tedi-select-option value="option5" label="Logout">
            <tedi-icon name="logout" /> Logout
          </tedi-select-option>
        </tedi-multiselect>
    `,
    props: {
      ...args,
    },
  }),
};

export const MultiselectSelectAll: Story = {
  render: (args) => ({
    template: `
      <tedi-multiselect
        [inputId]="inputId"
        [selectAll]="true"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [state]="state"
        [size]="size"
        [multiRow]="multiRow"
        [clearableTags]="clearableTags"
        [selectableGroups]="selectableGroups"
        [clearable]="clearable"
        [disabled]="disabled"
      >
        <tedi-select-option value="option1" label="Option 1" />
        <tedi-select-option value="option2" label="Option 2" />
        <tedi-select-option value="option3" label="Option 3" />
        <tedi-select-option value="option4" label="Option 4" />
        <tedi-select-option value="option5" label="Option 5" />
      </tedi-multiselect>
    `,
    props: {
      ...args,
    },
  }),
};

export const MultiselectGroupedOptions: Story = {
  render: (args) => ({
    template: `
      <tedi-multiselect
        [inputId]="inputId"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [state]="state"
        [size]="size"
        [multiRow]="multiRow"
        [clearableTags]="clearableTags"
        [selectAll]="selectAll"
        [selectableGroups]="selectableGroups"
        [clearable]="clearable"
        [disabled]="disabled"
      >
        <tedi-select-option value="option1" label="Option 1" group="Grupp 1"/>
        <tedi-select-option value="option2" label="Option 2" group="Grupp 1"/>
        <tedi-select-option value="option3" label="Option 3" group="Grupp 1"/>
        <tedi-select-option value="option4" label="Option 4" group="Grupp 2"/>
        <tedi-select-option value="option5" label="Option 5" group="Grupp 2"/>
      </tedi-multiselect>
    `,
    props: {
      ...args,
    },
  }),
};

export const MultiselectSelectableGroups: Story = {
  render: (args) => ({
    template: `
      <tedi-multiselect
        [inputId]="inputId"
        [selectableGroups]="true"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [state]="state"
        [size]="size"
        [multiRow]="multiRow"
        [clearableTags]="clearableTags"
        [selectAll]="selectAll"
        [clearable]="clearable"
        [disabled]="disabled"
      >
        <tedi-select-option value="option1" label="Option 1" group="Grupp 1"/>
        <tedi-select-option value="option2" label="Option 2" group="Grupp 1"/>
        <tedi-select-option value="option3" label="Option 3" group="Grupp 1"/>
        <tedi-select-option value="option4" label="Option 4" group="Grupp 2"/>
        <tedi-select-option value="option5" label="Option 5" group="Grupp 2"/>
      </tedi-multiselect>
    `,
    props: {
      ...args,
    },
  }),
};

export const MultiselectTagsMultirow: Story = {
  render: (args) => ({
    template: `
      <tedi-multiselect
        [inputId]="inputId"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [state]="state"
        [size]="size"
        [multiRow]="true"
        [clearableTags]="clearableTags"
        [selectAll]="selectAll"
        [selectableGroups]="true"
        [clearable]="clearable"
        [disabled]="disabled"
      >
        <tedi-select-option value="option1" label="Option 1" group="Grupp 1"/>
        <tedi-select-option value="option2" label="Option 2" group="Grupp 1"/>
        <tedi-select-option value="option3" label="Option 3" group="Grupp 1"/>
        <tedi-select-option value="option4" label="Option 4" group="Grupp 2"/>
        <tedi-select-option value="option5" label="Option 5" group="Grupp 2"/>
      </tedi-multiselect>
    `,
    props: {
      ...args,
    },
  }),
};

export const clearableTags: Story = {
  render: (args) => ({
    template: `
      <tedi-multiselect
        [inputId]="inputId"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [state]="state"
        [size]="size"
        [multiRow]="multiRow"
        [clearableTags]="true"
        [selectAll]="selectAll"
        [selectableGroups]="true"
        [clearable]="clearable"
        [disabled]="disabled"
      >
        <tedi-select-option value="option1" label="Option 1" group="Grupp 1"/>
        <tedi-select-option value="option2" label="Option 2" group="Grupp 1"/>
        <tedi-select-option value="option3" label="Option 3" group="Grupp 1"/>
        <tedi-select-option value="option4" label="Option 4" group="Grupp 2"/>
        <tedi-select-option value="option5" label="Option 5" group="Grupp 2"/>
      </tedi-multiselect>
    `,
    props: {
      ...args,
    },
  }),
};

export const multiselectNoOptions: Story = {
  render: (args) => ({
    template: `
      <tedi-multiselect
        [inputId]="inputId"
        [placeholder]="placeholder"
        [label]="label"
        [feedbackText]="feedbackText"
        [required]="required"
        [state]="state"
        [size]="size"
        [multiRow]="multiRow"
        [clearableTags]="clearableTags"
        [selectAll]="selectAll"
        [selectableGroups]="selectableGroups"
        [clearable]="clearable"
        [disabled]="disabled"
      />
    `,
    props: {
      ...args,
    },
  }),
};
