import { ArgsTable, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';

import Anchor from '../../components/anchor/anchor';
import Heading from '../../components/typography/heading/heading';
import VerticalSpacing from '../../components/vertical-spacing/vertical-spacing';

export const LabelProviderPage = (): JSX.Element => (
  <>
    <Title />
    <Subtitle>
      <>
        This component provides the labels helper function to other components via context api. Currently defined labels
        can be found <Anchor href="/?path=/docs/documentation-labels--labels">here</Anchor>
      </>
    </Subtitle>
    <Primary />
    <VerticalSpacing size={0.5}>
      <Heading element="h2">Usage</Heading>
      <Heading element="h3">Provider</Heading>
      <div>
        Wrap the provider around your app. <br />
        <pre>
          {'<LabelProvider labels={labels} locale={locale}>'}
          {'<YourApp />'}
          {'</LabelProvider>'}
        </pre>
      </div>
      <div>
        Labels is an object of key and value pairs. Keys should follow pattern:
        <ul>
          <li>{'<labelName>'}</li>
          <li>{'<componentName>.<labelName>'}</li>
        </ul>
        Values are either plain strings or some keys also support functions. Functions can be used for conditional
        translations like plurals.
      </div>
      <Heading element="h3">Consumer</Heading>
      <div>
        Use as hook: <br />
        <pre>
          {'const {getLabel} = useLabels();'}
          <br />
          {' const label = getLabel("someKey");'}
        </pre>
      </div>

      <div>
        Or wrap your component in the context consumer: <br />
        <pre>
          <span>{'<LabelContext.Consumer>'}</span>
          <br />
          <span>{' {(labels) => <Component someLabel={labels.getLabel("someKey")} />}'}</span>
          <br />

          <span>{'</LabelContext.Consumer>'}</span>
          <br />
        </pre>
      </div>
    </VerticalSpacing>

    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
);
