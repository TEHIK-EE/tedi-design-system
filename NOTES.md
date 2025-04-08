# New angular component

## CLI commands

```bash
# Navigate to angular project
cd libs/angular-components

# Tedi compomnent
ng g c ../tedi/components/text-group

# Community component
ng g c ../community/components/text-group
```

## Storybook

Create `text-group.stories.ts` file next to your component files

```typescript
import type { Meta, StoryObj } from "@storybook/angular";

import { TextGroupComponent } from "./text-group.component";

const meta: Meta<TextGroupComponent> = {
  title: "Tedi-Ready/Content/TextGroup",
  component: TextGroupComponent,
};

export default meta;
type Story = StoryObj<TextGroupComponent>;

export const Default: Story = {
  args: {},
};
```
