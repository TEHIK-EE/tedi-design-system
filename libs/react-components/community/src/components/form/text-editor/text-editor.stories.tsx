import { Meta, StoryFn, StoryObj } from '@storybook/react';
import dompurify from 'dompurify';
import React from 'react';
import * as showdown from 'showdown';

import Heading from '../../typography/heading/heading';
import { VerticalSpacing } from '../../vertical-spacing';
import TextEditor, { TextEditorProps } from './text-editor';
const converter = new showdown.Converter({ simpleLineBreaks: true });

/**
 * TextEditor is built with [draft.js](https://draftjs.org/). It takes markdown string as input and outputs <br/>
 * also markdown string. In this example we used [showdown.js](https://github.com/showdownjs/showdown) to get HTML <br/>
 * elements of markdown. It is **highly recommended** to use [dompurify](https://github.com/cure53/DOMPurify) <br/>
 * before using HTML content inside your app
 */
const meta: Meta<typeof TextEditor> = {
  title: 'Community/Form/TextEditor',
  component: TextEditor,
};

export default meta;

type Story = StoryObj<TextEditorProps>;

const Template: StoryFn<TextEditorProps> = (args) => {
  const [markdown, setMarkdown] = React.useState<string>(args.defaultValue || '');
  React.useEffect(() => {
    console.log({ markdown });
  }, [markdown]);
  const santizedHtml = React.useMemo(() => dompurify.sanitize(converter.makeHtml(markdown)), [markdown]);
  return (
    <VerticalSpacing>
      <TextEditor {...args} onChange={setMarkdown} />
      <hr />
      <Heading element="h3">Example of HTML in page:</Heading>
      <div className="text-editor-example" dangerouslySetInnerHTML={{ __html: santizedHtml }} />
    </VerticalSpacing>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    id: 'text-editor',
    label: 'Situation description',
    placeholder: 'Enter description...',
    defaultValue: `According to the victim the __violence__: is repeating; and affects them in following ways: health, safety, quality of life.
In addition in the home there are:
- underage children
- person has a rifle under the bed
- person was released from prison

Both parties had consumed alcohol`,
  },
};
