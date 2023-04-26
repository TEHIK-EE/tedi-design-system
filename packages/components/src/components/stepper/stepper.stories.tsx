import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { Col, Row } from '../grid';
import Heading from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import Step from './step';
import Stepper, { StepperProps } from './stepper';

interface TemplateProps extends StepperProps {
  controlled?: boolean;
  showNavigation?: boolean;
}

const Template = (args: TemplateProps) => {
  const { controlled, showNavigation, ...rest } = args;
  const [currentStep, setCurrentStep] = React.useState(args.deafultActiveStep || 0);

  const StepperNavigation = (): JSX.Element => (
    <Row justifyContent={currentStep === 0 ? 'end' : currentStep === 2 ? 'start' : 'between'}>
      {currentStep > 0 && (
        <Col width="auto">
          <Button visualType="secondary" onClick={() => setCurrentStep((prev) => prev - 1)}>
            Tagasi
          </Button>{' '}
        </Col>
      )}
      {currentStep < 2 && (
        <Col width="auto">
          <Button onClick={() => setCurrentStep((prev) => prev + 1)}>Edasi</Button>
        </Col>
      )}
    </Row>
  );

  return (
    <Stepper activeStep={controlled ? currentStep : undefined} onActiveStepChange={setCurrentStep} {...rest}>
      <Step id="step-1" label="Lapse arenguvajadused" completed={currentStep > 0}>
        <VerticalSpacing>
          <Heading element="h2">Triin Kass</Heading>
          <p>Content 1</p>
          {showNavigation && <StepperNavigation />}
        </VerticalSpacing>
      </Step>
      <Step id="step-2" label="Vanemate suutlikkus" completed={currentStep > 1}>
        <VerticalSpacing>
          <p>Content 2 </p>
          {showNavigation && <StepperNavigation />}
        </VerticalSpacing>
      </Step>
      <Step id="step-3" label="Pere ja keskkond" completed={currentStep > 2}>
        <VerticalSpacing>
          <p>Content 3 </p>
          {showNavigation && <StepperNavigation />}
        </VerticalSpacing>
      </Step>
    </Stepper>
  );
};

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  parameters: {
    docs: {
      description: {
        component: `<p>
         Steppers convey progress through numbered steps. It provides a wizard-like workflow. <br />
         Currently we have two visual types on stepper. Default one is used in most cases and the other one is used when stepper is used inside card in design.
        </p>`,
      },
    },
  },
  render: Template,
};

export default meta;
type Story = StoryObj<TemplateProps>;

export const Default: Story = {
  args: {
    ariaLabel: 'Stepper Heading',
  },
};

export const WithCard: Story = {
  args: {
    ariaLabel: 'Stepper Heading',
    card: true,
  },
};

export const DefaultActiveStep: Story = {
  args: {
    ...Default.args,
    deafultActiveStep: 1,
  },
};

export const StateHandledOutside: Story = {
  args: {
    ...Default.args,
    controlled: true,
    showNavigation: true,
  },
  name: 'State handled outside (Allowing navigation by clicking on step label)',
};

export const StateHandledOutsideNotClickable: Story = {
  args: {
    ...Default.args,
    allowStepLabelClick: false,
    controlled: true,
    showNavigation: true,
  },
  name: 'State handled outside (Not allowing navigation by clicking on step label)',
};
