import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { useLayout } from '../../../../../helpers/hooks/use-layout';
import Button from '../../../../button/button';
import Col from '../../../../grid/col';
import Row from '../../../../grid/row';
import RoleSelection from './header-role';

/**
 * HeaderRole is predefined component to handle showing user role and allow to change it. <br />
 * **Note**: This component is not meant to be used outside of Header.
 */
const meta: Meta<typeof RoleSelection> = {
  component: RoleSelection,
  title: 'Community-components/Layout/Header/HeaderRole',
};

export default meta;
type Story = StoryObj<typeof RoleSelection>;

const Template: StoryFn<typeof RoleSelection> = (args) => {
  const renderModal = useLayout(['mobile']);
  return <RoleSelection {...args} renderModal={renderModal} />;
};

export const Default: Story = {
  render: Template,
  args: {
    children: 'Any content',
    primaryInfo: 'Kristo Käärmann',
  },
};

export const WithSecondaryInfo: Story = {
  render: Template,
  args: {
    children: 'Any content',
    primaryInfo: 'Ida-Tallinna Keskhaigla',
    secondaryInfo: 'Family physician',
    label: 'Kristo Käärmann',
  },
};

export const WithoutOptions: Story = {
  render: Template,
  args: {
    primaryInfo: 'Tartu Linnavalitsus',
    label: 'Kristo Käärmann',
    children: undefined,
  },
};

export const WithLongContent: Story = {
  render: Template,
  args: {
    primaryInfo: 'Tartu Linnavalitsus',
    label: 'Kristo Käärmann',
    children: ({ onToggle }) => {
      const renderButton = (label: string) => (
        <Col>
          <Button visualType="link" onClick={() => onToggle(false)}>
            {label}
          </Button>
        </Col>
      );

      return (
        <Row direction="column" gap={3}>
          {renderButton('Role 1')}
          {renderButton('Role 2')}
          {renderButton('Role 3')}
          {renderButton('Role 4')}
          {renderButton('Role 5')}
          {renderButton('Role 6')}
          {renderButton('Role 7')}
          {renderButton('Role 8')}
          {renderButton('Role 9')}
          {renderButton('Role 10')}
          {renderButton('Role 11')}
        </Row>
      );
    },
  },
};
