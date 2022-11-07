import { Meta } from '@storybook/react';

import { Icon } from './icon';

export default {
  title: 'components/Icon',
  component: Icon,
} as Meta;

export const Outlined = () => {
  return (
    <div>
      <Icon name="home" size={18} />
      <Icon name="home" size={24} />
      <Icon name="home" size={36} />
      <Icon name="home" size={48} />
    </div>
  );
};

export const Filled = () => {
  return (
    <div>
      <Icon name="home" size={18} type="filled" />
      <Icon name="home" size={24} type="filled" />
      <Icon name="home" size={36} type="filled" />
      <Icon name="home" size={48} type="filled" />
    </div>
  );
};

export const Round = () => {
  return (
    <div>
      <Icon name="home" size={18} type="round" />
      <Icon name="home" size={24} type="round" />
      <Icon name="home" size={36} type="round" />
      <Icon name="home" size={48} type="round" />
    </div>
  );
};

export const Sharp = () => {
  return (
    <div>
      <Icon name="home" size={18} type="sharp" />
      <Icon name="home" size={24} type="sharp" />
      <Icon name="home" size={36} type="sharp" />
      <Icon name="home" size={48} type="sharp" />
    </div>
  );
};
