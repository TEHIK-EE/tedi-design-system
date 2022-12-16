import { Meta, Story } from '@storybook/react';

import StorybookDecorator from '../../../.storybook/storybook-decorator';
import LabelProvider, { LabelProviderProps } from './label-provider';
import { LabelProviderPage } from './storie-page';
import { useLabels } from './use-labels';

export default {
  title: 'components/LabelProvider',
  component: LabelProvider,
  decorators: [
    (Story, options) => (
      <StorybookDecorator {...options.args}>
        <Story />
      </StorybookDecorator>
    ),
  ],
  parameters: {
    docs: {
      page: () => <LabelProviderPage />,
    },
  },
} as Meta<LabelProviderProps>;

const Template: Story<LabelProviderProps> = (args) => {
  const { getLabel } = useLabels();
  const pluralLabel = getLabel('pagination.results');

  return (
    <>
      <p>{getLabel('close')}</p>
      <p>1 {typeof pluralLabel === 'string' ? pluralLabel : pluralLabel(1)}</p>
      <p>4 {typeof pluralLabel === 'string' ? pluralLabel : pluralLabel(4)}</p>
      <p>
        {/* Intentional missing label to showcase error in console */}
        {getLabel('missing.label' as any)} -{' '}
        <span className="text-secondary text-small">
          (Error in console that label is missing for key: missing.label)
        </span>
      </p>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  locale: 'en',
  labels: {
    close: 'Pane kinni',
    'pagination.results': (count) => (count === 1 ? 'nimi' : 'nime'),
  },
};
Default.parameters = {
  docs: {
    source: {
      type: 'code',
    },
  },
};
