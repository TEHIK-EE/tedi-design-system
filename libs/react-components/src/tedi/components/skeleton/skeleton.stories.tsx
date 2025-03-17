import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../../tedi/components/grid';
import { VerticalSpacing } from '../../../tedi/components/vertical-spacing';
import { Button } from '../buttons/button/button';
import { Skeleton, SkeletonProps } from '.';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2188-34298&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/429294-skeleton" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'TEDI-Ready/Components/Loader/Skeleton',
  subcomponents: {
    'Skeleton.Block': Skeleton.Block,
  } as never,
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
    docs: {
      source: {
        transform: (code: string) => {
          return code.replaceAll('SkeletonBlock', 'Skeleton.Block');
        },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2188-34298&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const Template: StoryFn<SkeletonProps> = (args) => (
  <Skeleton {...args}>
    <VerticalSpacing>
      <Skeleton.Block height="p" />
      <Skeleton.Block height="h3" />
      <Skeleton.Block height="h2" />
      <Skeleton.Block height="h1" />
      <Skeleton.Block height={100} />
    </VerticalSpacing>
  </Skeleton>
);

const TemplateWidth: StoryFn<SkeletonProps> = (args) => (
  <Skeleton {...args}>
    <VerticalSpacing>
      <Skeleton.Block width={50} height="p" />
      <Skeleton.Block width={75} height="h3" />
      <Skeleton.Block width="36px" height="h2" />
      <Skeleton.Block width="auto" height="h1" />
    </VerticalSpacing>
  </Skeleton>
);

export const Default: Story = {
  render: Template,

  args: {
    label: 'Loading something',
  },
};

export const SkeletonHeight: Story = {
  render: Template,

  args: {
    label: 'Loading something',
  },
};

export const SkeletonWidth: Story = {
  render: TemplateWidth,

  args: {
    label: 'Loading something',
  },
};

interface AccessibilitySkeletonObj {
  id: string;
  remove: (id: string) => void;
  delay?: number;
  style?: React.CSSProperties;
}
type AccessibilityTemplateProps = AccessibilitySkeletonObj & SkeletonProps;

const AccessibilityTemplate: StoryFn<AccessibilityTemplateProps> = ({ style, id, remove, delay = 3000, ...args }) => {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      remove(id);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, id, remove]);

  return (
    <Skeleton {...args}>
      <VerticalSpacing>
        <Skeleton.Block width={100} height="p" style={style} />
        <Skeleton.Block width={75} height={29} style={style} />
        <Skeleton.Block width={40} height={50} style={style} />
        <Skeleton.Block width={80} style={style} />
      </VerticalSpacing>
    </Skeleton>
  );
};

/**
 * This story showcases how screen readers announce the loading state of skeleton components. When interacting with the buttons, enable a screen reader to hear how it handles different skeleton loading scenarios. Note that skeletons displayed for only brief periods may not be announced by the screen reader. <br/>
 * **For optimal accessibility, it is strongly recommended to provide both label and completedLabel props.** These labels inform users about the type of content being loaded and when the loading process has finished, offering a more informative and accessible experience.
 */
export const Accessibility: Story = {
  render: (args) => {
    const [skeletons, setSkeletons] = React.useState<AccessibilityTemplateProps[]>([]);

    const removeSkeleton = (id: string) =>
      setSkeletons((prevState) => prevState.filter((skeleton) => skeleton.id !== id));

    const addSkeleton = (skeleton: Omit<AccessibilityTemplateProps, 'remove'>) => {
      setSkeletons((prevState) => [...prevState, { ...skeleton, remove: removeSkeleton }]);
    };

    const renderButton = (label: string, options: Omit<AccessibilityTemplateProps, 'remove'>) => (
      <Col width="auto">
        <Button onClick={() => addSkeleton(options)}>{label}</Button>
      </Col>
    );

    return (
      <VerticalSpacing>
        <Row gutterX={2}>
          {renderButton('Add a short loading block', { id: `skeleton-${skeletons.length}`, delay: 900 })}
          {renderButton('Add a long loading block', {
            id: `skeleton-${skeletons.length}`,
            style: { '--loader-skeleton-color': 'var(--red-600)' },
          })}
          {renderButton('Render loading block with custom labels', {
            id: `skeleton-${skeletons.length}`,
            style: { '--loader-skeleton-color': 'var(--green-600)' },
            label: 'Custom block is loading',
            completedLabel: 'Custom block has finished loading',
          })}
        </Row>

        <Row>
          {skeletons?.length ? (
            skeletons.map((skeleton) => (
              <Col xs={12} md={3} key={skeleton.id}>
                <AccessibilityTemplate {...args} {...skeleton} />
              </Col>
            ))
          ) : (
            <Col>No loaders</Col>
          )}
        </Row>
      </VerticalSpacing>
    );
  },
};
