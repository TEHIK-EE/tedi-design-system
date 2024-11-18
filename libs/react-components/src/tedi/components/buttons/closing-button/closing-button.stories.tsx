import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../grid';
import ClosingButton, { ClosingButtonProps } from './closing-button';

/**
 * [Figma ↗](https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=designnode-id=4514-63815&m=dev)<br/>
 * [Zeroheight ↗](https://tedi.tehik.ee/1ee8444b7/p/30df1b-closing-button)
 */

const meta: Meta<typeof ClosingButton> = {
  component: ClosingButton,
  title: 'Tedi-ready/Components/Buttons/ClosingButton',
};

const sizeArray: ClosingButtonProps['size'][] = ['medium', 'large'];

export default meta;
type Story = StoryObj<typeof ClosingButton>;

const SizeTemplate: StoryFn = () => {
  return (
    <div className="example-list w-50">
      {sizeArray.map((size, key) => (
        <Row className={`${key === sizeArray.length - 1 ? '' : 'border-bottom'} padding-14-16`} key={key}>
          <Col className="display-flex w-50">{size}</Col>
          <Col className="display-flex">
            <ClosingButton size={size} onClick={() => alert(`${size} button clicked`)} />
          </Col>
        </Row>
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
