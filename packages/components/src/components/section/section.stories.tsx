import { Meta } from '@storybook/react';

import Heading from '../typography/heading/heading';
import { Section } from './section';

export default {
  title: 'components/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const Default = () => {
  return (
    <Section>
      <Heading>Page title</Heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget convallis quam, eu rhoncus turpis.
        Vestibulum venenatis leo eget felis accumsan, in finibus metus tristique. Curabitur ac quam eu justo consequat
        efficitur quis eget purus. Donec blandit, augue in vehicula tempor, erat nulla tincidunt tellus, ut tincidunt
        purus dolor sed augue.
      </p>
    </Section>
  );
};
