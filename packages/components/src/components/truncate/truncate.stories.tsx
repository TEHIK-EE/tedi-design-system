import { Meta, Story } from '@storybook/react';
import React from 'react';

import Truncate, { TruncateProps } from './truncate';

export default {
  title: 'components/Truncate',
  component: Truncate,
} as Meta;

const Template: Story<TruncateProps> = (args) => <Truncate {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log('Closed'),
  onOpen: () => console.log('Opened'),
  children:
    'Lapse pere- ja perevälised suhted, usaldus, sõprussuhete loomine, vägivald (sh koolivägivald, -kiusamine), võimalus suhelda tema jaoks oluliste inimestega,  konfliktid ja nende lahendamise oskus, seksuaalne puutumatus, diskrimineerimine. Vanemate suutlikkus toetada ning suunata last usaldusväärsete ja turvaliste suhete loomisel, lapse kaitsmine. Lapse pere- ja perevälised suhted, usaldus, sõprussuhete loomine, vägivald (sh koolivägivald, -kiusamine), võimalus suhelda tema jaoks oluliste inimestega,  konfliktid ja nende lahendamise oskus, seksuaalne puutumatus, diskrimineerimine. Vanemate suutlikkus toetada ning suunata last usaldusväärsete ja turvaliste suhete loomisel, lapse kaitsmine.',
};

export const ShortText = Template.bind({});
ShortText.args = {
  ...Default.args,
  children: 'Short Text',
};
