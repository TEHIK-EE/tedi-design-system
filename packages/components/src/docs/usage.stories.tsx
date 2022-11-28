import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import { Anchor, Separator, VerticalSpacing } from '..';

export default {
  title: 'Documentation/Usage',
  parameters: {
    docs: {
      page: () => (
        <>
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
                accessibility). See all labels under Documentation/Labels. More documentation about LabelProvider can be
                found under components.
              </p>
              <h4>1. Wrap Application with LabelProvider</h4>
              <pre>
                {'<LabelProvider labels={labels}>'}
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
              <h4>3. Load Material icons css</h4>
              <p>
                Load the required icons by defining a Material Icons link in <code>{'<head>'}</code>
              </p>
              <p>
                <pre>
                  {
                    '<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined&display=swap" rel="stylesheet" />'
                  }
                </pre>
              </p>
              <p>or import it in your css</p>
              <p>
                <pre>
                  {/* eslint-disable-next-line prettier/prettier,react/jsx-curly-brace-presence */}
                  {
                    '@import url("https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined&display=swap");'
                  }
                </pre>
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
                , to successfully use all components do:
              </p>
              <h4>1. Set locale</h4>
              <pre>
                import &apos;dayjs/locale/et&apos;; <br />
                dayjs.locale(&apos;et&apos;); // use locale globally
              </pre>
            </VerticalSpacing>
          </VerticalSpacing>
        </>
      ),
    },
  },
} as Meta;

export const Usage = () => <span>test</span>;
