import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import Section from '../components/section/section';
import { VerticalSpacing } from '../components/vertical-spacing';

export default {
  title: 'Documentation',
  parameters: {
    docs: {
      page: () => (
        <Section>
          <Title>How to validate the children prop of any component</Title>
          <Subtitle>
            Typically React and TypeScript allow for very strict typing, however this is not true for the children prop
            of a component.
          </Subtitle>
          <VerticalSpacing size={0.5}>
            <p>TODO: Example of how it might seem logical, and what the result is</p>
            <p>Examples of how the validation works: see validateChildren.spec.tsx</p>
          </VerticalSpacing>
        </Section>
      ),
    },
  },
} as Meta;

export const ValidatingChildren = () => null;
