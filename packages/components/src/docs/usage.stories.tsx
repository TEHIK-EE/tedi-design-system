import { Subtitle, Title } from '@storybook/addon-docs';
import { Meta } from '@storybook/react';

import Anchor from '../lib/anchor/anchor';
import Separator from '../lib/separator/separator';
import { VerticalSpacing } from '../lib/vertical-spacing';

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
              <p>Todo: Tutorial to install</p>
            </VerticalSpacing>
            <Separator spacing={2} />
            <VerticalSpacing size={0.5}>
              <h3>Labels</h3>
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
              <h3>Dayjs</h3>
              <p>
                Some of the Tehik react-components depend on{' '}
                <Anchor url="https://day.js.org/docs/en/installation/installation" target="_blank">
                  dayjs
                </Anchor>{' '}
                and{' '}
                <Anchor url="https://mui.com/x/introduction/" target="_blank">
                  Mui x
                </Anchor>
                , to successfully use all components do:
              </p>
              <h4>1. Set locale</h4>
              <pre>
                import &apos;dayjs/locale/et&apos;; <br />
                dayjs.locale(&apos;et&apos;); // use locale globally
              </pre>
              <h4>2. Wrap your application with LocalizationProvider</h4>
              <pre>
                {'import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";'} <br />
                {'import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";'} <br /> <br />
                {'<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ee">'}
                <br />
                {'  <LabelProvider labels={defaultEELabels}><YourApp /></LabelProvider>'}
                <br />
                {'</LocalizationProvider>'}
              </pre>
            </VerticalSpacing>
          </VerticalSpacing>
        </>
      ),
    },
  },
} as Meta;

export const Usage = () => <span>test</span>;
