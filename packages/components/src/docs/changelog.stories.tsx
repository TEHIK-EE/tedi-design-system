import { Markdown } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import ChangelogMDX from '../../../../CHANGELOG.md';
import Section from '../components/section/section';

export default {
  title: 'Documentation/Changelog',
  parameters: {
    previewTabs: { canvas: { hidden: true } },
    docs: {
      page: () => (
        <Section>
          {/* TS thinks MD file is a React element, but it's just a string */}
          <Markdown>{ChangelogMDX as any as string}</Markdown>
        </Section>
      ),
    },
  },
} as Meta;

export const Changelog = () => null;
