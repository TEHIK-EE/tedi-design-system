import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Title } from '@storybook/addon-docs';
import { Meta, Story } from '@storybook/react';
import dompurify from 'dompurify';
import React from 'react';
import * as showdown from 'showdown';

import { VerticalSpacing } from '../../vertical-spacing';
import TextEditor, { TextEditorProps } from './text-editor';
const converter = new showdown.Converter({ simpleLineBreaks: true });

export default {
  title: 'components/Form/TextEditor',
  component: TextEditor,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            TextEditor is built with [draft.js](https://draftjs.org/). It takes markdown string as input and outputs
            also markdown string. In example we used [showdown.js](https://github.com/showdownjs/showdown) to get HTML
            elements of markdown. It is **highly recommended** to use [dompurify](https://github.com/cure53/DOMPurify)
            before using HTML content inside your app.
          </Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

const Template: Story<TextEditorProps> = (args) => {
  const [markdown, setMarkdown] = React.useState<string>(args.defaultValue || '');
  React.useEffect(() => {
    console.log({ markdown });
  }, [markdown]);
  const santizedHtml = React.useMemo(() => dompurify.sanitize(converter.makeHtml(markdown)), [markdown]);
  return (
    <VerticalSpacing>
      <TextEditor {...args} onChange={setMarkdown} />
      <hr />
      <h3>Example of HTML in page:</h3>
      <div className="text-editor-example" dangerouslySetInnerHTML={{ __html: santizedHtml }} />
    </VerticalSpacing>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'text-editor',
  label: 'Olukorra kirjeldus',
  placeholder: 'Sisesta menetluse kirjeldus...',
  defaultValue: `Kannatanu hinnangul on __vägivald__: korduv; ning mõjutab teda järgmiselt: tervist mõjutab, turvalisust mõjutab, toimetulekut mõjutab.
  Lisaks veel on kodus:
  - alealised lapsed
  - mehel on voodi alla peidetud õhupüss
  - isik vabandes hiljuti vanglast

  Mõlemad osapooled olid alkoholi tarbinud`,
};
