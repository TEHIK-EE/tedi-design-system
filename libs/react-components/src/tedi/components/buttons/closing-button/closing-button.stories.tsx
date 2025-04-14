import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Col, Row } from '../../layout/grid';
import ClosingButton, { ClosingButtonProps } from './closing-button';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/30df1b-closing-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof ClosingButton> = {
  component: ClosingButton,
  title: 'Tedi-Ready/Components/Buttons/ClosingButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4514-63815&m=dev',
    },
  },
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
