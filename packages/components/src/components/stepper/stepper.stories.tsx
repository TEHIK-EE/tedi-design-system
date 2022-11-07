import { Meta, Story } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { Col, Row } from '../grid';
import Heading from '../heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import Step from './step';
import Stepper, { StepperProps } from './stepper';

export default {
  title: 'components/Stepper',
  component: Stepper,
} as Meta;

const Template: Story<StepperProps> = (args) => {
  const [currentStep, setCurrentStep] = React.useState(0);

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
    <Stepper {...args} activeStep={currentStep} onActiveStepChange={(newStep) => setCurrentStep(newStep)}>
      <Step id="step-1" label="Lapse arenguvajadused" completed={currentStep > 0}>
        <VerticalSpacing>
          <Heading level={2}>Triin Kass</Heading>
          Content 1
          <StepperNavigation />
        </VerticalSpacing>
      </Step>
      <Step id="step-2" label="Vanemate suutlikkus" completed={currentStep > 1}>
        <VerticalSpacing>
          <p>Content 2 </p>
          <StepperNavigation />
        </VerticalSpacing>
      </Step>
      <Step id="step-3" label="Pere ja keskkond" completed={currentStep > 2}>
        <VerticalSpacing>
          <p>Content 3 </p>
          <StepperNavigation />
        </VerticalSpacing>
      </Step>
    </Stepper>
  );
};

export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'Stepper Heading',
};
