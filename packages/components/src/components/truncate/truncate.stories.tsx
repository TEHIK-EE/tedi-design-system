import { Meta, StoryObj } from '@storybook/react';

import Truncate from './truncate';

const meta: Meta<typeof Truncate> = {
  component: Truncate,
};

export default meta;
type Story = StoryObj<typeof Truncate>;

export const Default: Story = {
  args: {
    onClose: () => console.log('Closed'),
    onOpen: () => console.log('Opened'),
    children:
      'Lapse pere- ja perevälised suhted, usaldus, sõprussuhete loomine, vägivald (sh koolivägivald, -kiusamine), võimalus suhelda tema jaoks oluliste inimestega,  konfliktid ja nende lahendamise oskus, seksuaalne puutumatus, diskrimineerimine. Vanemate suutlikkus toetada ning suunata last usaldusväärsete ja turvaliste suhete loomisel, lapse kaitsmine. Lapse pere- ja perevälised suhted, usaldus, sõprussuhete loomine, vägivald (sh koolivägivald, -kiusamine), võimalus suhelda tema jaoks oluliste inimestega,  konfliktid ja nende lahendamise oskus, seksuaalne puutumatus, diskrimineerimine. Vanemate suutlikkus toetada ning suunata last usaldusväärsete ja turvaliste suhete loomisel, lapse kaitsmine.',
  },
};

export const ShortText: Story = {
  args: {
    ...Default.args,
    children: 'Short Text',
  },
};
