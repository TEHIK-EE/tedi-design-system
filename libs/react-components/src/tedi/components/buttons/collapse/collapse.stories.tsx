import { Meta, StoryObj } from '@storybook/react';

import { Heading } from '../../base/typography/heading/heading';
import { Text } from '../../base/typography/text/text';
import { VerticalSpacing } from '../../layout/vertical-spacing';
import Collapse from './collapse';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.0.4-(work-in-progress)?node-id=15433-138256&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="https://tedi.tehik.ee/1ee8444b7/p/546461-floating-button" target="_BLANK">Zeroheight ↗</a>
 */

const meta: Meta<typeof Collapse> = {
  component: Collapse,
  title: 'Tedi-ready/Components/Buttons/Collapse',
  parameters: {
    status: {
      type: [{ name: 'breakpointSupport', url: '?path=/docs/helpers-usebreakpointprops--usebreakpointprops' }],
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.0.4-(work-in-progress)?node-id=15433-138256&m=dev',
    },
    controls: {
      exclude: ['sm', 'md', 'lg', 'xl', 'xxl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

export const Default: Story = {};

export const IconNeutralButton = {
  args: {
    ...Default.args,
    hideCollapseText: true,
  },
};

export const IconSecondaryButton = {
  args: {
    ...Default.args,
    arrowType: 'secondary',
    hideCollapseText: true,
  },
};

export const TitleRow = {
  args: {
    id: 'collapse-1',
    openText: 'Näita rohkem',
    closeText: 'Näita vähem',
    title: (
      <Heading element="h5" color="secondary">
        Juhtumi üldandmed
      </Heading>
    ),
    children: (
      <VerticalSpacing>
        <div>
          <Text color="secondary">Laste osalus</Text>
          <p>peretüli lapse osaluseta</p>
        </div>
        <div>
          <Text color="secondary">Juhtumi liigid</Text>
          <p>peretüli (lapsega)</p>
        </div>
        <div>
          <Text color="secondary">Kannatanu seos vägivaldsega</Text>
          <p>tütar</p>
        </div>
      </VerticalSpacing>
    ),
  },
};

export const TitleRowReversed = {
  args: {
    id: 'collapse-1',
    openText: 'Näita rohkem',
    closeText: 'Näita vähem',
    titleRowProps: { direction: 'row-reverse' },
    title: (
      <Heading element="h5" color="secondary">
        Juhtumi üldandmed
      </Heading>
    ),
    children: (
      <VerticalSpacing>
        <div>
          <Text color="secondary">Laste osalus</Text>
          <p>peretüli lapse osaluseta</p>
        </div>
        <div>
          <Text color="secondary">Juhtumi liigid</Text>
          <p>peretüli (lapsega)</p>
        </div>
        <div>
          <Text color="secondary">Kannatanu seos vägivaldsega</Text>
          <p>tütar</p>
        </div>
      </VerticalSpacing>
    ),
  },
};
