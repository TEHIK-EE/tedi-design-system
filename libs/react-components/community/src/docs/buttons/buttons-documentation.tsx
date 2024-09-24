import { Title } from '@storybook/blocks';
import React from 'react';

import { Col, Row } from '../../../../tedi/src/components/grid';
import { VerticalSpacing } from '../../../../tedi/src/components/vertical-spacing';
import { Button, ButtonProps, Card, CardContent, Heading, Separator, Text } from '../../index';

interface ExampleButtonProps {
  heading?: string;
  text?: React.ReactNode;
  button?: Partial<ButtonProps>;
}

const importantText = (
  <VerticalSpacing size={0.5}>
    <p>
      Used for destructive actions that can lead to data loss or a significant change, that&apos;s difficult or
      impossible to reverse, such as &quot;Delete&quot; or &quot;Remove&quot;. They can be accompanied by a confirmation
      step asking the user to verify that they want to proceed with the action, to prevent accidental data loss.
    </p>
    <p>
      Note that not all destructive actions need to be styled this way. In most cases the secondary default button works
      better.
    </p>
  </VerticalSpacing>
);

const invertedText = (
  <VerticalSpacing size={0.5}>
    <p>These buttons are designed to be used on dark backgrounds.</p>
    <p>Inverted background colors:</p>
  </VerticalSpacing>
);

const buttonTypes: ExampleButtonProps[] = [
  { button: { color: 'default' }, text: 'These are the standard buttons used most often in an interface.' },
  {
    button: { color: 'positive' },
    text: 'These buttons lead to an action that progresses the users journey or completes a task, like &quot;Submit," "Confirm," or "Save." ',
  },
  { button: { color: 'important' }, text: importantText },
  { button: { color: 'inverted' }, text: invertedText },
];

const buttonStates: ExampleButtonProps[] = [
  { heading: 'Default', button: { children: 'Default' } },
  { heading: 'Hover/active', button: { children: 'Hover', isActive: true } },
  { heading: 'Focus', button: { children: 'Focus' }, text: 'Focus is only visible when using keyboard navigation.' },
  { heading: 'Disabled', button: { children: 'Disabled', disabled: true } },
  { heading: 'Loading', button: { children: 'Loading', isLoading: true } },
];

const loadingButtons: ExampleButtonProps[] = [
  {
    heading: 'button: text only',
    text: 'Text is replaced. Button width stays the same.',
  },
  {
    heading: 'button: text + icon',
    text: 'Icon is replaced',
    button: { iconRight: 'arrow_forward' },
  },
  {
    heading: 'button: icon + text',
    text: 'Icon is replaced',
    button: { iconLeft: 'search' },
  },
  {
    heading: 'button: icon only',
    text: 'Icon is replaced',
    button: { icon: 'add' },
  },
];

const ButtonsDocumentation = () => {
  return (
    <VerticalSpacing size={2}>
      <Title>Button documentation</Title>
      <ButtonTypes />
      <Separator />
      <ButtonStates />
      <Separator />
      <WidthBehavior />
      <Separator />
      <Accessibility />
    </VerticalSpacing>
  );
};

const ButtonTypes = () => (
  <VerticalSpacing>
    <Heading element="h2">Button types</Heading>
    {buttonTypes.map((buttonType, key) => (
      <ButtonType key={key} {...buttonType} />
    ))}
  </VerticalSpacing>
);

const ButtonStates = () => (
  <VerticalSpacing size={1.5}>
    <Heading element="h2">Button States</Heading>
    <p>
      Button states are an essential aspect of user interface design that provide real-time feedback and clarity about
      the interactivity of buttons. They improve the responsiveness of the interface and guide users through their
      interactions by clearly indicating what actions are possible at any given moment.
    </p>
    <VerticalSpacing size={0.5}>
      <Heading element="h3" className="h4">
        Transition
      </Heading>
      <p>The transition between the states is 150ms.</p>
    </VerticalSpacing>
    <VerticalSpacing size={0.5}>
      <Heading element="h3" className="h4">
        Examples
      </Heading>
      {buttonStates.map((buttonState) => (
        <ButtonState key={buttonState.heading} {...buttonState} />
      ))}
    </VerticalSpacing>
    <Heading element="h3" className="h4">
      Loading
    </Heading>
    <p>
      The loading button state is used to indicate that the system is processing a request and the user needs to wait
      for the action to complete.
    </p>
    <VerticalSpacing size={0.5}>
      <Heading element="h4" className="h6" modifiers="bold">
        Behavior
      </Heading>
      <p>
        During the loading state the button&apos;s functionality is disabled to prevent users from clicking multiple
        times, which could result in submitting the same data repeatedly.
      </p>
    </VerticalSpacing>
    <VerticalSpacing size={0.5}>
      <Heading element="h4" className="h6" modifiers="bold">
        Design
      </Heading>
      <p>
        In buttons where an icon is already present, the initial icon is replaced with a loading icon. In text-only
        buttons, the text is replaced with a loading icon. Note that during the loading state, the button always
        maintains the same width as in its default state.
      </p>
    </VerticalSpacing>
    <Row gutter={5}>
      {loadingButtons.map((loadingButton) => (
        <LoadingButton key={loadingButton.heading} {...loadingButton} />
      ))}
    </Row>
  </VerticalSpacing>
);

const WidthBehavior = () => (
  <VerticalSpacing size={1.5}>
    <Heading element="h2">Width behavior</Heading>
    <Row gutter={5}>
      <Col md={6}>
        <VerticalSpacing>
          <Card borderless={true} background="bg-muted">
            <CardContent>
              <Row gutter={2} className="text-center">
                <Col width={12}>
                  <Button>Search</Button>
                </Col>
                <Col width={12}>
                  <Button visualType="secondary">Submit application</Button>
                </Col>
              </Row>
            </CardContent>
          </Card>
          <Heading element="h4" className="h6" modifiers="bold">
            Adaptable button (Default)
          </Heading>
          <p>Button width adjusts to the content. </p>
        </VerticalSpacing>
      </Col>
      <Col md={6}>
        <VerticalSpacing>
          <Card borderless={true} background="bg-muted">
            <CardContent>
              <Row gutter={2} className="text-center">
                <Col width={12}>
                  <Button fullWidth>Search</Button>
                </Col>
                <Col width={12}>
                  <Button visualType="secondary" fullWidth>
                    Submit application
                  </Button>
                </Col>
              </Row>
            </CardContent>
          </Card>
          <Heading element="h4" className="h6" modifiers="bold">
            Full width of container
          </Heading>
          <p>
            Button width can be adjusted to the width of the container it’s placed in. It’s not a very common usage.
          </p>
        </VerticalSpacing>
      </Col>
    </Row>
  </VerticalSpacing>
);

const Accessibility = () => (
  <VerticalSpacing size={1.5}>
    <Heading element="h2">Accessibility</Heading>
    <p>
      <b>Focus:</b>
      <ul>
        <li>Keyboard navigation only. Focus is not shown on click.</li>
      </ul>
    </p>
    <p>
      <b>Keyboard navigation:</b>
      <ul>
        <li>Tab: focus lands on button.</li>
        <li>Enter/space: activates the button.</li>
      </ul>
    </p>
    <p>Does not apply for disabled and loading buttons, these buttons are skipped.</p>
  </VerticalSpacing>
);

const ButtonType = ({ text, button }: ExampleButtonProps) => (
  <Row>
    <Col xs={12} md={4}>
      <Card borderless={true} background={button?.color === 'inverted' ? 'bg-inverted' : 'bg-muted'}>
        <CardContent>
          <Row gutter={2} className="text-center">
            <Col width={12}>
              <Button {...button}>
                <Text modifiers="capitalize" element="span">
                  {button?.color}
                </Text>
              </Button>
            </Col>
            <Col width={12}>
              <Button {...button} visualType="secondary">
                <Text modifiers="capitalize" element="span">
                  {button?.color}
                </Text>
              </Button>
            </Col>
            <Col width={12}>
              <Button {...button} visualType="tertiary">
                <Text modifiers="capitalize" element="span">
                  {button?.color}
                </Text>
              </Button>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Col>
    <Col xs={12} md={8}>
      <VerticalSpacing size={0.5}>
        <Text modifiers={['bold', 'capitalize']}>{button?.color}</Text>
        {text}
      </VerticalSpacing>
    </Col>
  </Row>
);

const ButtonState = ({ heading, text, button }: ExampleButtonProps) => (
  <Row>
    <Col xs={12} md={4}>
      <Card borderless={true} background="bg-muted">
        <CardContent>
          <Row gutter={2} className="text-center">
            <Col width={12}>
              <Button {...button}>{heading}</Button>
            </Col>
            <Col width={12}>
              <Button
                {...button}
                visualType={button?.isLoading ? undefined : 'secondary'}
                iconLeft={button?.isLoading ? 'add' : undefined}
              >
                {heading}
              </Button>
            </Col>
            <Col width={12}>
              <Button
                {...button}
                visualType={button?.isLoading ? undefined : 'tertiary'}
                iconRight={button?.isLoading ? 'add' : undefined}
              >
                {heading}
              </Button>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Col>
    <Col xs={12} md={4}>
      <Card borderless={true} background="bg-inverted">
        <CardContent>
          <Row gutter={2} className="text-center">
            <Col width={12}>
              <Button {...button} color="inverted">
                {heading}
              </Button>
            </Col>
            <Col width={12}>
              <Button
                {...button}
                visualType={button?.isLoading ? undefined : 'secondary'}
                iconLeft={button?.isLoading ? 'add' : undefined}
                color="inverted"
              >
                {heading}
              </Button>
            </Col>
            <Col width={12}>
              <Button
                {...button}
                visualType={button?.isLoading ? undefined : 'tertiary'}
                iconRight={button?.isLoading ? 'add' : undefined}
                color="inverted"
              >
                {heading}
              </Button>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Col>
    <Col xs={12} md={4}>
      <VerticalSpacing size={0.5}>
        <Heading element="h4" className="h6" modifiers="bold">
          {heading}
        </Heading>
        {text && <Text>{text}</Text>}
      </VerticalSpacing>
    </Col>
  </Row>
);

const LoadingButton = ({ heading, text, button }: ExampleButtonProps) => (
  <Col xs={12} md={3} sm={6}>
    <VerticalSpacing size={1.5}>
      <Card background="bg-muted" borderless={true}>
        <CardContent>
          <Row gutter={2} className="text-center">
            <Col width={12}>
              <Button {...button}>Search</Button>
            </Col>
            <Col width={12}>
              <Button {...button} isLoading>
                Search
              </Button>
            </Col>
          </Row>
        </CardContent>
      </Card>
      <VerticalSpacing size={0.5}>
        <Heading element="h4" className="h6" modifiers="bold">
          {heading}
        </Heading>
        <p>{text}</p>
      </VerticalSpacing>
    </VerticalSpacing>
  </Col>
);

export default ButtonsDocumentation;
