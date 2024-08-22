import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';

import Button from '../button/button';
import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
import { VerticalSpacing } from '../vertical-spacing';
import { Skeleton, SkeletonBlock, SkeletonProps } from '.';

/**
 * Skeleton is a component that is used to indicate that content is loading.
 * Build your skeleton using the SkeletonBlock component.
 */
const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'Community/Skeleton',
  subcomponents: { SkeletonBlock } as never,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const Template: StoryFn<SkeletonProps> = (args) => (
  <Skeleton {...args}>
    <VerticalSpacing>
      <SkeletonBlock width={75} height={29} />
      <SkeletonBlock width={100} height={21} />
      <SkeletonBlock width={40} height={50} />
      <SkeletonBlock width={80} />
    </VerticalSpacing>
  </Skeleton>
);

export const Default: Story = {
  render: Template,

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Skeleton {...args}>
      <VerticalSpacing>
        <SkeletonBlock width={75} height={29} style={style} />
        <SkeletonBlock width={100} height={21} style={style} />
        <SkeletonBlock width={40} height={50} style={style} />
        <SkeletonBlock width={80} style={style} />
      </VerticalSpacing>
    </Skeleton>
  );
};

/**
 * This story demonstrates how screen-readers handle announcing skeleton loading state. Open a screen-reader and listen to the announcements when you click the buttons.<br/>
 * Screen-readers don't announce skeletons that are visible only for a short time.<br />
 * **It is highly recommended to set the `label` and `completedLabel` props, so the user will get better information about what kind of content is loading.**
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
            style: { '--color-bg-skeleton-rgb': '196 57 57' } as React.CSSProperties,
          })}
          {renderButton('Render loading block with custom labels', {
            id: `skeleton-${skeletons.length}`,
            style: { '--color-bg-skeleton-rgb': '140 99 10' } as React.CSSProperties,
            label: 'Custom block is loading',
            completedLabel: 'Custom block has finished loading',
          })}
        </Row>

        <Row>
          {skeletons?.length ? (
            skeletons.map((skeleton) => (
              <Col xs={12} md={3} key={skeleton.id}>
                <Card>
                  <CardContent>
                    <AccessibilityTemplate {...args} {...skeleton} />
                  </CardContent>
                </Card>
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
