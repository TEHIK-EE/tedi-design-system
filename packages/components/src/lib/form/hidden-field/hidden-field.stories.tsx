import { Meta } from '@storybook/react';

import { HiddenMultiselect } from './examples/hidden-multiselect';
import { HiddenSelect } from './examples/hidden-select';
import { HiddenTextField } from './examples/hidden-textfield';
import HiddenField from './hidden-field';

export default {
  title: 'components/Form/HiddenField',
  component: HiddenField,
  argTypes: {
    content: { control: false },
    fieldType: { control: false },
    fieldOptions: { control: false },
  },
} as Meta;

export { HiddenTextField, HiddenSelect, HiddenMultiselect };
