import { Meta, StoryFn, StoryObj } from '@storybook/react';

import ClosingButton, { ClosingButtonProps } from './closing-button';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=designnode-id=4514-63815&m=dev)<br/>
 * [Zeroheight ↗](https://zeroheight.com/1ee8444b7/p/30df1b-closing-button)
 */

const meta: Meta<typeof ClosingButton> = {
  component: ClosingButton,
  title: 'Tedi-ready/Components/ClosingButton',
};

const sizeArray: ClosingButtonProps['size'][] = ['small', 'medium', 'large'];

export default meta;
type Story = StoryObj<typeof ClosingButton>;

const SizeTemplate: StoryFn = () => {
  return (
    <div className="example-list w-50">
      {sizeArray.map((size, key) => (
        <div className={`row ${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <div className="column w-50">
            <div className="display-flex">{size}</div>
          </div>
          <div className="column">
            <div className="display-flex">
              <ClosingButton size={size} onClick={() => alert(`${size} button clicked`)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const Default: Story = {
  args: {
    title: 'close',
    size: 'medium',
  },
};

export const Size: Story = {
  render: SizeTemplate,
};
