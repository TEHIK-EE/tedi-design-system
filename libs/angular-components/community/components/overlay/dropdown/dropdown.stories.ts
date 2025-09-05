import { Meta, StoryObj, moduleMetadata } from "@storybook/angular";
import { DropdownItemComponent } from "../dropdown-item/dropdown-item.component";
import { DropdownComponent } from "./dropdown.component";
import { DropdownTriggerDirective } from "./dropdown-trigger/dropdown-trigger.directive";
import { ButtonComponent } from "@tehik-ee/tedi-angular/tedi";

/**
 * <p>Dropdown can be used to display hidden menus on selectable items. Use `[tedi-dropdown-trigger]` directive on element that opens the dropwdown</p>
 */
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
  argTypes: {
    dropdownId: {
      description: "Unique id",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    dropdownRole: {
      description:
        "Role of the dropdown. Adds necessary attributes to `tedi-dropdown-trigger` and `tedi-dropdown-item` elements",
      table: {
        defaultValue: { summary: "undefined" },
        type: {
          summary: '"menu" | "listbox" | undefined',
        },
      },
    },
    opened: {
      description: "Whether dropdown is initially opened",
      table: {
        defaultValue: { summary: "false" },
        type: {
          summary: "boolean",
        },
      },
    },
  },
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
