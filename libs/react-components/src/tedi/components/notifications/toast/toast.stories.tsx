import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { ToastContainer } from 'react-toastify';

import Button from '../../buttons/button/button';
import { Col, Row } from '../../layout/grid';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import { Alert, AlertProps } from '../alert/alert';
import { sendNotification } from './toast';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4281-58105&m=dev" target="_blank">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/35370f-toast" target="_blank">Zeroheight ↗</a>
 */

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'TEDI-Ready/Components/Notifications/Toast',
  parameters: {
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-(work-in-progress)?node-id=4281-58105&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const Template: StoryFn<AlertProps> = (args) => (
  <>
    <ToastContainer />
    <div style={{ height: 200 }}>
      <VerticalSpacing>
        <Row>
          <Col lg={12}>
            <Button
              onClick={() =>
                sendNotification(
                  { type: 'success', title: 'Notice', children: 'Something was successful!', ...args },
                  { autoClose: 5000 }
                )
              }
            >
              Show success toast
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() =>
                sendNotification(
                  { type: 'warning', title: 'Notice', icon: 'warning', children: 'Warning!', ...args },
                  { autoClose: 5000 }
                )
              }
            >
              Show warning toast
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() =>
                sendNotification(
                  { type: 'danger', title: 'Notice', icon: 'error', children: 'Something went wrong!', ...args },
                  { autoClose: 5000 }
                )
              }
            >
              Show danger toast
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() =>
                sendNotification(
                  {
                    type: 'info',
                    title: 'Notice',
                    icon: 'info',
                    children: 'Some info text that can usually be very long!',
                    ...args,
                  },
                  { autoClose: 5000 }
                )
              }
            >
              Show info toast
            </Button>
          </Col>
        </Row>
      </VerticalSpacing>
    </div>
  </>
);

export const Default: Story = {
  render: Template,
  args: {},
};
