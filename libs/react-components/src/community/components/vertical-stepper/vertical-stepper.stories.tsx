import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Text } from '../../../tedi';
import Separator from '../../../tedi/components/misc/separator/separator';
import { StepItem, VerticalStepper } from '.';
import { SubItem } from './sub-item/sub-item';

const meta: Meta<typeof VerticalStepper> = {
  component: VerticalStepper,
  title: 'Community/VerticalStepper',
  subcomponents: { StepItem, SubItem } as never,
  parameters: {
    docs: {
      description: {
        component: 'VerticalStepper with StepItem and SubItem ',
      },
    },
  },
};

export default meta;

const Template: StoryFn<typeof VerticalStepper> = ({ isCompact = false }) => (
  <div style={{ width: 350 }}>
    <VerticalStepper isCompact={isCompact}>
      <StepItem title="Suhtlemine" isSelected hasIcon>
        <Text color="tertiary">Täidab ametnik</Text>
        <SubItem state="completed">
          <a href="#">Sotsiaalsed suhted</a>
        </SubItem>
        <SubItem state="error" hasIcon>
          <a>Ametlikud suhted</a>
        </SubItem>
        <SubItem state="informative">
          <a>Kognitiivne võimekus</a>
        </SubItem>
        <SubItem isSelected>
          <a>Psüühiline seisund</a>
        </SubItem>
        <SubItem state="disabled">
          <a>Riskivaldkonnad</a>
        </SubItem>
        <SubItem state="informative">
          <a>Tervise eest hoolitsemine</a>
        </SubItem>
      </StepItem>
      <StepItem title="Vaimne tervis" state="completed" hasIcon>
        <SubItem>
          <a>Riskivaldkonnad</a>
        </SubItem>
      </StepItem>
      <Separator spacing={1} />
      <StepItem title="Elukeskkond" state="completed">
        <SubItem>
          <a>Sobiva eluaseme leidmine</a>
        </SubItem>
      </StepItem>
      <StepItem title="Hõivatus" state="error" hasIcon>
        <SubItem>
          <a>Rakenduse leidmine ja säiilitamine</a>
        </SubItem>
      </StepItem>
      <StepItem title="Vaba aeg ja huvitegevus" state="default"></StepItem>
      <StepItem title="Igapäevaelu toimingud" state="disabled"></StepItem>
      <StepItem title="Mitteametlik abi">
        <SubItem state="completed">
          <a>Abi perekonnalt</a>
        </SubItem>
        <SubItem state="error">
          <a>Abi sõpradelt ja tuttavatelt</a>
        </SubItem>
        <SubItem>
          <a>Tervisevaldkonna teenused</a>
        </SubItem>
        <SubItem isSelected>
          <a>Haridusvaldkonna teenused</a>
        </SubItem>
        <SubItem state="disabled">
          <a>Tööhõive valdkonna teenused</a>
        </SubItem>
        <SubItem state="informative">
          <a>Muu abi</a>
        </SubItem>
      </StepItem>
    </VerticalStepper>
  </div>
);

export const Default = Template.bind({});
Default.args = { isCompact: false };

export const Compact = Template.bind({});
Compact.args = { isCompact: true };
