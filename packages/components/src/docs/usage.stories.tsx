import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import Anchor from '../components/anchor/anchor';
import Section from '../components/section/section';
import Separator from '../components/separator/separator';
import { VerticalSpacing } from '../components/vertical-spacing';

export default {
  title: 'Documentation/Usage',
  parameters: {
    docs: {
      page: () => (
        <Section>
          <Title />
          <Subtitle>Get started with Tehik react-components.</Subtitle>
          <VerticalSpacing>
            <VerticalSpacing size={0.5}>
              <h3>Installation</h3>
              <pre>npm install @tehik/react-components</pre>
            </VerticalSpacing>
            <Separator spacing={2} />
            <VerticalSpacing size={0.5}>
              <h3>Labels - LabelProvider</h3>
              <p>
                Tehik react-components use labels that are provided with <b>{'<LabelProvider>'}</b> component. Every
                application should be wrapped with LabelProvider to provider all necessary labels for users (mostly for
                accessibility). See all labels under{' '}
                <Anchor href="/?path=/docs/documentation-labels--labels">Documentation/Labels</Anchor>. More
                documentation about LabelProvider can be found under{' '}
                <Anchor href="/?path=/docs/components-labelprovider--default">components</Anchor>.
              </p>
              <h4>1. Wrap Application with LabelProvider</h4>
              <pre>
                {'<LabelProvider labels={labels} locale={locale}>'}
                {'<YourApp />'}
                {'</LabelProvider>'}
              </pre>
            </VerticalSpacing>
            <Separator spacing={2} />

            <VerticalSpacing size={0.5}>
              <h3>Styles - StyleProvider</h3>
              <p>
                Tehik react-components are depending on some global styles. Follow next steps to import styles to your
                application.
              </p>
              <h4>1. Wrap Application with StyleProvider</h4>
              <pre>
                {'<StyleProvider>'}
                {'<YourApp />'}
                {'</StyleProvider>'}
              </pre>
              <h4>2. Add styles import to the root</h4>
              <p>
                Add <code>import &apos;@tehik/react-components/style.css&apos;;</code> to the root of application.
              </p>
            </VerticalSpacing>
            <Separator spacing={2} />
            <VerticalSpacing size={0.5}>
              <h3>Dayjs</h3>
              <p>
                Some of the Tehik react-components depend on{' '}
                <Anchor href="https://day.js.org/docs/en/installation/installation" target="_blank">
                  dayjs
                </Anchor>{' '}
                and{' '}
                <Anchor href="https://mui.com/x/introduction/" target="_blank">
                  Mui x
                </Anchor>
                . Dayjs must be application dependencie, so its recommended to use dayjs to handle dates.{' '}
                <code>&apos;en&apos;</code> locale have one overwritten rule, that sets weekStart to monday, currently
                it isn’t supported to override it. Contact slack if u need to override it.
              </p>
            </VerticalSpacing>
          </VerticalSpacing>
        </Section>
      ),
    },
  },
} as Meta;

export const Usage = () => <span>test</span>;
