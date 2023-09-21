import React from 'react';

import { useLabels } from '../../providers/label-provider';
import Button from '../button/button';
import { Card, CardContent } from '../card';
import { Col, Row } from '../grid';
import Icon, { IconProps } from '../icon/icon';
import Tag, { TagProps } from '../tag/tag';
import { VerticalProgressContext } from './vertical-progress';

export interface VerticalProgressItemProps {
  /**
   * The index of the item. Index is used to pass to onItemOpen callback
   */
  index: number;
  /**
   * Title of the item. By design it should be visually h4 Heading component
   */
  title: React.ReactNode;
  /**
   * VerticalProgressItem children. Its rendered out as content of the item.
   * In whatever state Item is, application should handle in which state content is rendered or which content is rendered.
   */
  children?: React.ReactNode;
  /**
   * State of the item
   * - active - item is currently open item
   * - completed - item is completed
   * - error - item has error
   * - disabled - item is disabled
   * - undefined - item is not current, completed, no error and not disabled
   */
  state?: 'active' | 'completed' | 'error' | 'disabled';
}

export const VerticalProgressItemContext = React.createContext<VerticalProgressItemProps>({
  index: 0,
  title: null,
});

export const VerticalProgressItem = (props: VerticalProgressItemProps) => {
  const { children } = props;
  return (
    <VerticalProgressItemContext.Provider value={props}>
      <Card>
        <CardContent padding={0.75} lg={{ padding: 1.5 }}>
          <VerticalProgressItemHeader />
          {children && (
            <CardContent
              padding={{ top: 1, right: 0, bottom: 0, left: 0 }}
              lg={{ padding: { top: 2, right: 2.5, bottom: 0, left: 2.5 } }}
            >
              {children}
            </CardContent>
          )}
        </CardContent>
      </Card>
    </VerticalProgressItemContext.Provider>
  );
};

const VerticalProgressItemHeader = () => {
  const { title, state, index } = React.useContext(VerticalProgressItemContext);
  const { onItemOpen } = React.useContext(VerticalProgressContext);
  const { getLabel } = useLabels();

  const isDisabled = state === 'disabled';
  const isActive = state === 'active';

  const getTagColor = (): TagProps['color'] => {
    switch (state) {
      case 'active':
        return 'primary';
      case 'completed':
        return 'positive';
      case 'error':
        return 'important';
      default:
        return 'default';
    }
  };

  const getTagType = (): TagProps['type'] => {
    switch (state) {
      case 'active':
      case 'completed':
      case 'error':
        return 'default';
      default:
        return 'ghost';
    }
  };

  const getIcon = (): IconProps['name'] => {
    switch (state) {
      case 'completed':
        return 'check';
      case 'error':
        return 'exclamation';
      default:
        return 'chevron_right';
    }
  };

  return (
    <Row alignItems="center" justifyContent="between">
      <Col width="auto">
        <Row gutterX={3} gutterY={0} alignItems="center" wrap="nowrap">
          <Col width="auto">
            <Tag iconOnly rounded color={getTagColor()} type={getTagType()}>
              <Icon name={getIcon()} size={16} />
            </Tag>
          </Col>
          <Col width="auto">{title}</Col>
        </Row>
      </Col>
      {!(isDisabled || isActive) && (
        <Col width="auto">
          <Button visualType="link" iconRight="edit" onClick={() => onItemOpen(index)}>
            {getLabel('vertical-progress.edit')}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default VerticalProgressItem;
