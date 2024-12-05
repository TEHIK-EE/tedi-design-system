import { Meta, StoryObj } from '@storybook/react';

import { Heading } from '../typography/heading/heading';
import { VerticalSpacing } from '../vertical-spacing';
import { Section } from './section';

const meta: Meta<typeof Section> = {
  component: Section,
  title: 'TEDI-Ready/Components/Helpers/Section',
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    children: (
      <VerticalSpacing>
        <Heading>Page title</Heading>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget convallis quam, eu rhoncus turpis.
          Vestibulum venenatis leo eget felis accumsan, in finibus metus tristique. Curabitur ac quam eu justo consequat
          efficitur quis eget purus. Donec blandit, augue in vehicula tempor, erat nulla tincidunt tellus, ut tincidunt
          purus dolor sed augue.
        </p>
      </VerticalSpacing>
    ),
    className: 'default-section',
  },
};

export const SectionAsArticle: Story = {
  args: {
    as: 'article',
    children: (
      <VerticalSpacing>
        <Heading>Article Title</Heading>
        <p>
          This is a section rendered as an <code>article</code> element. It can be used to define sections of content
          that could stand independently.
        </p>
      </VerticalSpacing>
    ),
    className: 'article-section',
  },
};

export const SectionWithCustomIdAndARIA: Story = {
  args: {
    as: 'section',
    id: 'custom-section',
    role: 'complementary',
    children: (
      <VerticalSpacing>
        <Heading id="section-heading">Custom Section with ARIA</Heading>
        <p>
          This section demonstrates the use of custom <code>id</code> and ARIA attributes for accessibility.
        </p>
      </VerticalSpacing>
    ),
    className: 'custom-section',
  },
};
