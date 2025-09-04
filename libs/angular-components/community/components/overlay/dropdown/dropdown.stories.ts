import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { DropdownItemComponent } from "../dropdown-item/dropdown-item.component";
import { DropdownComponent } from "./dropdown.component";
import { DropdownTriggerDirective } from "./dropdown-trigger/dropdown-trigger.directive";
import { ButtonComponent } from "@tehik-ee/tedi-angular/tedi";

const meta: Meta<DropdownComponent> = {
  title: "Community/Overlay/Dropdown",
  component: DropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [
        DropdownComponent,
        DropdownItemComponent,
        DropdownTriggerDirective,
        ButtonComponent,
      ],
    }),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DropdownComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <tedi-dropdown dropdownId="dropdown-example" dropdownRole="menu">
        <button tedi-button tedi-dropdown-trigger>Trigger</button>
        <ul [style.margin]="0">
          <li tedi-dropdown-item>Dropdown item</li>
          <li tedi-dropdown-item>Dropdown item</li>
          <li tedi-dropdown-item>Dropdown item</li>
        </ul>
      </ tedi-dropdown>
    `,
  }),
};
