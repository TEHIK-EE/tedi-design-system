import { Description, Stories, Title } from '@storybook/addon-docs';
import { Meta, StoryObj } from '@storybook/react';

import { Button, Col, Row, TextField, VerticalSpacing } from '../../index';

const EmptyComponent = () => <p>Empty component</p>;

const meta: Meta = {
  component: EmptyComponent,
  title: 'Community/Form',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <Stories />
        </>
      ),
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Most applications handle form validation on their own with libraries like <a href="https://formik.org/" target="_blank">Formik</a>. <br/>
 * Because browsers own validation might interfere with that process, we disable browsers validation on form submit. This can be overridden by `formNoValidate` prop on the button.
 */
export const BrowserValidation: Story = {
  render: () => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Form submitted');
        }}
      >
        <VerticalSpacing>
          <TextField id="email" label="Email" required input={{ type: 'email' }} />
          <Row gutter={2}>
            <Col width="auto">
              <Button type="submit">Submits form without validation</Button>
            </Col>
            <Col width="auto">
              <Button type="submit" formNoValidate={false}>
                Submits form with validation
              </Button>
            </Col>
          </Row>
        </VerticalSpacing>
      </form>
    );
  },
};
