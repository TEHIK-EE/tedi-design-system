import { Meta, StoryFn } from '@storybook/react';

import StorybookDecorator from '../../../../.storybook/storybook-decorator';
import { Text } from '../../components/typography/text/text';
import { UnknownType } from '../../types/commonTypes';
import LabelProvider, { LabelProviderProps } from './label-provider';
import { useLabels } from './use-labels';

export default {
  title: 'TEDI-Ready/Providers/LabelProvider',
  component: LabelProvider,
  decorators: [
    (Story, options) => {
      return (
        <StorybookDecorator {...options.args}>
          <Story />
        </StorybookDecorator>
      );
    },
  ],
} as Meta<LabelProviderProps>;

const Template: StoryFn<LabelProviderProps> = (args) => {
  const { getLabel } = useLabels();
  const pluralLabel = getLabel('pagination.results');

  return (
    <>
      <p>
        {getLabel('close')}
        <Text color="secondary" modifiers="small" element="span">
          (Custom label provided by Application)
        </Text>
      </p>
      <p>1 {typeof pluralLabel === 'string' ? pluralLabel : pluralLabel(1)}</p>
      <p>4 {typeof pluralLabel === 'string' ? pluralLabel : pluralLabel(4)}</p>
      <p>
        {/* Intentional missing label to showcase error in console */}
        {getLabel('missing.label' as UnknownType)} -{' '}
        <Text color="secondary" modifiers="small" element="span">
          (Error in console that label is missing for key: missing.label)
        </Text>
      </p>
    </>
  );
};

export const Default = {
  render: Template,

  args: {
    locale: 'en',
    labels: {
      close: 'Close this',
    },
  },

  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};
