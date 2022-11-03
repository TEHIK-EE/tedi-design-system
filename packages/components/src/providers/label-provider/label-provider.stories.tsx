import { Meta, Story } from '@storybook/react';

import LabelProvider, { LabelProviderProps } from './label-provider';
import { LabelProviderPage } from './storie-page';
import { useLabels } from './use-labels';

export default {
  title: 'components/LabelProvider',
  component: LabelProvider,
  parameters: {
    docs: {
      page: () => <LabelProviderPage />,
    },
  },
} as Meta;

const Template: Story<LabelProviderProps> = (args) => (
  <LabelProvider {...args}>
    <TestComponent />
  </LabelProvider>
);

const TestComponent = (): JSX.Element => {
  const { getLabel } = useLabels();

  return (
    <>
      <p>{getLabel('close')}</p>
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
  labels: { close: 'Sulge' },
};
