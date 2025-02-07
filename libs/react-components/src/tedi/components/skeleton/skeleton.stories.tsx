import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import { Col, Row } from '../../../tedi/components/grid';
import { VerticalSpacing } from '../../../tedi/components/vertical-spacing';
import { Skeleton, SkeletonBlock, SkeletonProps } from '.';

/**
 * <a href="https://www.figma.com/file/jWiRIXhHRxwVdMSimKX2FF/TEDI-Design-System-(draft)?type=design&node-id=2188-34298&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/429294-skeleton" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'TEDI-Ready/Components/Loader/Skeleton',
  subcomponents: { SkeletonBlock } as never,
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const Template: StoryFn<SkeletonProps> = (args) => (
  <Skeleton {...args}>
    <VerticalSpacing>
      <SkeletonBlock height="p" />
      <SkeletonBlock height="h3" />
      <SkeletonBlock height="h2" />
      <SkeletonBlock height="h1" />
      <SkeletonBlock height={100} />
    </VerticalSpacing>
  </Skeleton>
);

const TemplateWidth: StoryFn<SkeletonProps> = (args) => (
  <Skeleton {...args}>
    <VerticalSpacing>
      <SkeletonBlock width={50} height="p" />
      <SkeletonBlock width={75} height="h3" />
      <SkeletonBlock width="36px" height="h2" />
      <SkeletonBlock width="auto" height="h1" />
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
  }, []);

  return (
    <Skeleton {...args}>
      <VerticalSpacing>
        <SkeletonBlock width={100} height="p" style={style} />
        <SkeletonBlock width={75} height={29} style={style} />
        <SkeletonBlock width={40} height={50} style={style} />
        <SkeletonBlock width={80} style={style} />
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

    //TODO: Replace button with TEDI-Ready Button component once it's developed
    const renderButton = (label: string, options: Omit<AccessibilityTemplateProps, 'remove'>) => (
      <Col width="auto">
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--color-primary-main)',
            color: 'var(--color-text-inverted)',
            border: 'none',
            borderRadius: '3rem',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
          onClick={() => addSkeleton(options)}
        >
          {label}
        </button>
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
