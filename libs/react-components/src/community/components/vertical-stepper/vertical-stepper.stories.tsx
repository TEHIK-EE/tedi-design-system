import { Meta, StoryFn } from '@storybook/react';

import { Button, StatusBadge, Text, VerticalSpacing } from '../../../tedi';
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
        component: 'Verttical Stepper with StepItem and SubItem. Currently supports desktop only. ',
      },
    },
  },
};

export default meta;

const Template: StoryFn<typeof VerticalStepper> = ({ isCompact = false }) => (
  <div style={{ width: 350 }}>
    <VerticalSpacing size={4}>
      <VerticalStepper isCompact={isCompact}>
        <StepItem title="Suhtlemine" isSelected hasIcon>
          <Button size="small">Button</Button>
          <SubItem title="Sotsiaalsed suhted" state="completed">
            <StatusBadge color="warning" variant="filled">
              Mõõdukas probleem
            </StatusBadge>
          </SubItem>
          <SubItem title="Ametlikud suhted" state="error" hasIcon>
            <StatusBadge color="neutral" variant="filled">
              Probleem puudub
            </StatusBadge>
          </SubItem>
          <SubItem title="Kognitiivne võimekus" state="informative"></SubItem>
          <SubItem title="Psüühiline seisund" isSelected>
            <Text color="tertiary">Täidab ametnik</Text>
          </SubItem>
          <SubItem title="Riskivaldkonnad" state="disabled"></SubItem>
          <SubItem title="Tervise eest hoolitsemine" state="informative"></SubItem>
        </StepItem>
        <StepItem title="Vaimne tervis" state="completed" hasIcon>
          <StatusBadge color="warning" variant="filled">
            Mõõdukas probleem
          </StatusBadge>

          <SubItem title="Riskivaldkonnad"></SubItem>
        </StepItem>
        <Separator spacing={1} />
        <StepItem title="Elukeskkond" state="completed">
          <SubItem title="Sobiva eluaseme leidmine"></SubItem>
        </StepItem>
        <StepItem title="Hõivatus" state="error" hasIcon>
          <SubItem title="Rakenduse leidmine ja säiilitamine"></SubItem>
        </StepItem>
        <StepItem title="Vaba aeg ja huvitegevus" state="default"></StepItem>
        <StepItem title="Igapäevaelu toimingud" state="disabled"></StepItem>
        <StepItem title="Mitteametlik abi">
          <SubItem title="Abi perekonnalt" state="completed"></SubItem>
          <SubItem title="Abi sõpradelt ja tuttavatelt" state="error"></SubItem>
          <SubItem title="Tervisevaldkonna teenused"></SubItem>
          <SubItem title="Haridusvaldkonna teenused" isSelected></SubItem>

          <SubItem title="Tööhõive valdkonna teenused" state="disabled"></SubItem>
          <SubItem title="Muu abi" state="informative"></SubItem>
          <SubItem title="Muu abi 2"></SubItem>
        </StepItem>
      </VerticalStepper>
    </VerticalSpacing>
  </div>
);

export const Default = Template.bind({});
Default.args = { isCompact: false };

export const Compact = Template.bind({});
Compact.args = { isCompact: true };
