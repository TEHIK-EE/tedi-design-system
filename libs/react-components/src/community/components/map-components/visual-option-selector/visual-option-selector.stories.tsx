import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import VisualOptionSelector from './visual-option-selector';

/**
 * <a href="https://www.figma.com/design/3DIVbgDcC0R4qgqWhZMfvw/Veera-Map-Design-System?node-id=109-25209&m=dev" target="_BLANK">Figma ↗</a><br/>
 */

const meta: Meta<typeof VisualOptionSelector> = {
  component: VisualOptionSelector,
  title: 'Community/Map components/VisualOptionSelector',
};

export default meta;
type Story = StoryObj<typeof VisualOptionSelector>;

const InteractiveTemplate = (args: React.ComponentProps<typeof VisualOptionSelector>) => {
  const [selectedValue, setSelectedValue] = useState(args.options[0].value);

  return (
    <>
      <VisualOptionSelector {...args} selectedValue={selectedValue} onSelect={setSelectedValue} />
    </>
  );
};

export const ColorSelector: Story = {
  render: (args) => <InteractiveTemplate {...args} />,
  args: {
    type: 'color',
    label: { children: 'Värv' },
    name: 'color-selector',
    options: [
      { value: 'red', color: '#ef4444', label: 'Red' },
      { value: 'orange', color: '#f97316', label: 'Orange' },
      { value: 'amber', color: '#f59e0b', label: 'Amber' },
      { value: 'yellow', color: '#eab308', label: 'Yellow' },
      { value: 'lime', color: '#84cc16', label: 'Lime' },
      { value: 'green', color: '#10b981', label: 'Green' },
      { value: 'teal', color: '#14b8a6', label: 'Teal' },
      { value: 'blue', color: '#3b82f6', label: 'Blue' },
      { value: 'indigo', color: '#6366f1', label: 'Indigo' },
      { value: 'violet', color: '#8b5cf6', label: 'Violet' },
      { value: 'pink', color: '#ec4899', label: 'Pink' },
      { value: 'none', label: 'transparent' },
    ],
  },
};

export const IconSelector: Story = {
  render: (args) => <InteractiveTemplate {...args} />,
  args: {
    type: 'icon',
    label: { children: 'Ikoon', required: true },
    name: 'color-selector',
    options: [
      { value: 'home', icon: 'home', label: 'Home' },
      { value: 'home1', icon: 'cottage', label: 'Home' },
      { value: 'home2', icon: 'foundation', label: 'Home' },
      { value: 'home3', icon: 'location_home', label: 'Home' },
      { value: 'home4', icon: 'cabin', label: 'Home' },
      { value: 'home5', icon: 'nest_multi_room', label: 'Home' },
      { value: 'home6', icon: 'home', label: 'Home' },
      { value: 'home7', icon: 'cottage', label: 'Home' },
      { value: 'home8', icon: 'foundation', label: 'Home' },
      { value: 'home9', icon: 'location_home', label: 'Home' },
      { value: 'home10', icon: 'cabin', label: 'Home' },
      { value: 'home111', icon: 'nest_multi_room', label: 'Home' },
    ],
  },
};

export const IconSelectorWithDescriptors: Story = {
  render: (args) => <InteractiveTemplate {...args} />,
  args: {
    type: 'icon',
    label: { children: 'Tüüp' },
    name: 'icon-selector',
    layout: 'column',
    showLabels: true,
    options: [
      { value: 'punkt', icon: 'location_on', label: 'Punkt' },
      { value: 'joon', icon: 'show_chart', label: 'Joon' },
      { value: 'ala', icon: 'polyline', label: 'Ala' },
    ],
  },
};
