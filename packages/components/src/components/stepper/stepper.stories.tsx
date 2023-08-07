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
  const [currentStep, setCurrentStep] = React.useState(args.defaultActiveStep || 0);
  const [completedSteps, setCompletedSteps] = React.useState<number[]>(args.defaultActiveStep ? [0] : []);

  const StepperNavigation = (): JSX.Element => (
    <Row justifyContent={currentStep === 0 ? 'end' : currentStep === 2 ? 'start' : 'between'}>
      {currentStep > 0 && (
        <Col width="auto">
          <Button visualType="secondary" onClick={() => handleActiveStepChange(currentStep - 1)}>
            Tagasi
          </Button>
        </Col>
      )}
      {currentStep < 2 && (
        <Col width="auto">
          <Button onClick={() => handleActiveStepChange(currentStep + 1)}>Edasi</Button>
        </Col>
      )}
    </Row>
  );

  const handleActiveStepChange = (newActiveStep: number): void => {
    if (!completedSteps.includes(currentStep) && newActiveStep > currentStep) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    setCurrentStep(newActiveStep);
  };

  const getIsCompleted = (index: number): boolean => {
    return controlled ? completedSteps.includes(index) : currentStep > index;
  };

  return (
    <Stepper activeStep={controlled ? currentStep : undefined} onActiveStepChange={handleActiveStepChange} {...rest}>
      <Step id="step-1" label="Lapse arenguvajadused" completed={getIsCompleted(0)}>
        <VerticalSpacing>
          <Heading element="h2">Triin Kass</Heading>
          <p>Content 1</p>
          {showNavigation && <StepperNavigation />}
        </VerticalSpacing>
      </Step>
      <Step id="step-2" label="Vanemate suutlikkus" completed={getIsCompleted(1)}>
        <VerticalSpacing>
          <p>Content 2 </p>
          {showNavigation && <StepperNavigation />}
        </VerticalSpacing>
      </Step>
      <Step id="step-3" label="Pere ja keskkond" completed={getIsCompleted(2)}>
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
  subcomponents: { Step } as never,
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
    defaultActiveStep: 1,
  },
};

export const StateHandledOutside: Story = {
  args: {
    ...Default.args,
    controlled: true,
    showNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story: `By default <code>allowStepLabelClick=true</code>, so user clicking on step label will navigate to that step. <br/>
          Bear in mind that user could skip steps this way. Adding additional navigation inside content is not necessary, but still recommended for better UX.`,
      },
    },
  },
};

export const StateHandledOutsideNavNotClickable: Story = {
  args: {
    ...Default.args,
    allowStepLabelClick: false,
    controlled: true,
    showNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When <code>allowStepLabelClick=false</code>, user cannot navigate to other steps by clicking on step label. UI should provide other means to navigate between steps.',
      },
    },
  },
};

export const StateHandledOutsideCompleted: Story = {
  args: {
    ...Default.args,
    allowStepLabelClick: 'completed',
    controlled: true,
    showNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When <code>allowStepLabelClick="completed"</code>, user can only navigate to completed steps. <br />UI should provide other means to navigate to the next steps.',
      },
    },
  },
};

export const StateHandledOutsideCompletedOrNext: Story = {
  args: {
    ...Default.args,
    allowStepLabelClick: 'completed-or-next',
    controlled: true,
    showNavigation: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When <code>allowStepLabelClick="completed-or-next"</code>, user can only navigate to completed steps or next step of current step. <br />Application should handle validating the steps and navigating to the next step from <code>onActiveStepChange</code>.',
      },
    },
  },
};
