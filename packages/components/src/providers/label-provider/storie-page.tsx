import { ArgsTable, Primary, PRIMARY_STORY, Stories, Subtitle, Title } from '@storybook/addon-docs';

import VerticalSpacing from '../../components/vertical-spacing/vertical-spacing';

export const LabelProviderPage = (): JSX.Element => (
  <>
    <Title />
    <Subtitle>This component provides the labels helper function to other components via context api.</Subtitle>
    <Primary />
    <VerticalSpacing size={0.5}>
      <h2>Usage</h2>
      <h3>Provider</h3>
      <p>
        Wrap the provider around your app. <br />
        <pre>
          {'<LabelProvider labels={labels}>'}
          {'<YourApp />'}
          {'</LabelProvider>'}
        </pre>
      </p>
      <p>
        Labels is an object of key and value pairs. Keys should follow pattern:
        <ul>
          <li>{'<labelName>'}</li>
          <li>{'<componentName>.<labelName>'}</li>
        </ul>
      </p>
      <h3>Consumer</h3>
      <p>
        Use as hook: <br />
        <pre>
          {'const {getLabel} = useLabels();'}
          <br />
          {' const label = getLabel("someKey");'}
        </pre>
      </p>

      <p>
        Or wrap your component in the context consumer: <br />
        <pre>
          <span>{'<LabelContext.Consumer>'}</span>
          <br />
          <span>{' {(labels) => <Component someLabel={labels.getLabel("someKey")} />}'}</span>
          <br />

          <span>{'</LabelContext.Consumer>'}</span>
          <br />
        </pre>
      </p>
    </VerticalSpacing>

    <ArgsTable story={PRIMARY_STORY} />
    <Stories />
  </>
);
