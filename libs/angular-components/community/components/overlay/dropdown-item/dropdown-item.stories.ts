import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { DropdownItemComponent } from "./dropdown-item.component";
import { IconComponent } from "@tehik-ee/tedi-angular/tedi";

const meta: Meta<DropdownItemComponent> = {
  title: "Community Angular/Overlay/Dropdown Item",
  component: DropdownItemComponent,
  decorators: [
    moduleMetadata({
      imports: [DropdownItemComponent, IconComponent],
    }),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DropdownItemComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div tedi-dropdown-item>Default dropdown item</div>
      <div tedi-dropdown-item>Default dropdown item</div>
      <div tedi-dropdown-item>Default dropdown item</div>
    `,
  }),
};

export const Selected: Story = {
  render: () => ({
    template: `
      <div tedi-dropdown-item [selected]="true">Selected dropdown item</div>
      <div tedi-dropdown-item>Default dropdown item</div>
      <div tedi-dropdown-item>Default dropdown item</div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div tedi-dropdown-item [disabled]="true">Disabled dropdown item</div>
      <div tedi-dropdown-item>Default dropdown item</div>
      <div tedi-dropdown-item>Default dropdown item</div>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    template: `
      <div tedi-dropdown-item>
        <tedi-icon name="info" style="margin-right: 8px;"></tedi-icon>
        Dropdown item with icon
      </div>
      <div tedi-dropdown-item>Default dropdown item</div>
      <div tedi-dropdown-item>Default dropdown item</div>
    `,
  }),
};

export const WithContent: Story = {
  render: () => ({
    template: `
      <div tedi-dropdown-item>
        <div>Primary text</div>
        <small>Secondary description text</small>
      </div>
      <div tedi-dropdown-item>Default dropdown item</div>
      <div tedi-dropdown-item>Default dropdown item</div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; width: 250px; border: 1px solid #ddd; border-radius: 4px;">
        <div tedi-dropdown-item>Default dropdown item</div>
        <div tedi-dropdown-item [selected]="true">Selected dropdown item</div>
        <div tedi-dropdown-item [disabled]="true">Disabled dropdown item</div>
        <div tedi-dropdown-item>
          <tedi-icon name="info" style="margin-right: 8px;"></tedi-icon>
          With icon
        </div>
        <div tedi-dropdown-item>
          <div>Primary text</div>
          <small>Secondary description text</small>
        </div>
      </div>
    `,
  }),
};
