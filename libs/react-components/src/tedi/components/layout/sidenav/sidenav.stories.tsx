import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Text } from '../../base/typography/text/text';
import { Col, Row } from '../grid';
import { SideNavItem } from './components/sidenav-item/sidenav-item';
import {
  exampleDefaultOpen,
  exampleNavCollapsibleItems,
  exampleNavCollapsibleItemsWithLinks,
  exampleNavItems,
  exampleThirdLevelMenuItems,
  exampleThirdLevelMenuItemsLinks,
} from './examples';
import { SideNav } from './sidenav';

/**
 * <a href="https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.8.9--work-in-progress-?node-id=6367-171750&m=dev" target="_BLANK">Figma ↗</a><br/>
 * <a href="#" target="_BLANK">Zeroheight ↗</a>
 *
 * To test the mobile layout, either resize your browser window or use Storybook's built-in viewport tools.
 */

const meta: Meta<typeof SideNav> = {
  component: SideNav,
  title: 'TEDI-Ready/Layout/SideNav',
  subcomponents: {
    'SideNav.Item': SideNav.Item,
    'SideNav.Toggle': SideNav.Toggle,
    'SideNav.Dropdown': SideNav.Dropdown,
    'SideNav.Mobile': SideNav.Mobile,
  },
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          return code
            .replaceAll('SideNavItem', 'SideNav.Item')
            .replaceAll('SideNavToggle', 'SideNav.Toggle')
            .replaceAll('SideNavDropdown', 'SideNav.Dropdown')
            .replaceAll('SideNavMobile', 'SideNav.Mobile');
        },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/jWiRIXhHRxwVdMSimKX2FF/TEDI-READY-2.8.9--work-in-progress-?node-id=6367-171750&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SideNav>;

const Template: StoryFn<typeof SideNav> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <SideNav.Toggle menuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      <SideNav {...args} isMobileOpen={isOpen} />
    </>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    navItems: exampleNavItems,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

const stateArray = ['Default', 'Hover', 'Focus', 'Active'];

interface TemplateStateProps extends React.ComponentProps<typeof SideNavItem> {
  states: typeof stateArray;
}

const TemplateWithStates: StoryFn<TemplateStateProps> = (args) => {
  const { states, ...sideNavItemProps } = args;

  return (
    <>
      {states.map((state, index) => (
        <Row key={index} className="padding-14-16">
          <Col width={3} className="display-flex align-items-center">
            <Text modifiers="bold">{state}</Text>
          </Col>
          <Col className="display-flex align-items-center">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '240px' }}>
              <SideNavItem
                {...sideNavItemProps}
                isActive={state === 'Active'}
                className={state === 'Focus' ? 'focus-visible' : ''}
                id={state}
              />
            </ul>
          </Col>
        </Row>
      ))}

      <Row className="padding-14-16">
        <Col width={3} className="display-flex align-items-center">
          <Text modifiers="bold">With Subitems</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '240px' }}>
            <SideNavItem
              {...sideNavItemProps}
              isDefaultOpen
              subItems={[{ children: 'Sub Item 1' }, { children: 'Sub Item 2', isActive: true }]}
            >
              Parent item
            </SideNavItem>
          </ul>
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col width={3} className="display-flex align-items-center">
          <Text modifiers="bold">Parent is link with subitems</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '240px' }}>
            <SideNavItem
              href="#"
              isDefaultOpen
              subItems={[{ children: 'Sub Item 1' }, { children: 'Sub Item 2', isActive: true }]}
            >
              Parent item
            </SideNavItem>
          </ul>
        </Col>
      </Row>
      <Row className="padding-14-16">
        <Col width={3} className="display-flex align-items-center">
          <Text modifiers="bold">Sub item is parent</Text>
        </Col>
        <Col className="display-flex align-items-center">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '240px' }}>
            <SideNavItem
              isDefaultOpen
              subItems={[
                { children: 'Second level' },
                { children: 'Second level' },
                { children: 'Second level parent', isActive: true, subItems: [{ children: 'Third level' }] },
              ]}
            >
              First level
            </SideNavItem>
          </ul>
        </Col>
      </Row>
    </>
  );
};

export const SidenavItemStates: StoryObj<TemplateStateProps> = {
  render: TemplateWithStates,
  args: {
    states: stateArray,
    children: 'Text',
    icon: 'dashboard',
  },
  parameters: {
    pseudo: {
      hover: '#Hover',
      focusVisible: '#Focus',
      active: '#Active',
    },
  },
};

export const SecondLevelMenuItems: Story = {
  render: Template,
  args: {
    navItems: exampleNavCollapsibleItems,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const SecondLevelMenuItemsParentsAreLinks: Story = {
  render: Template,
  args: {
    navItems: exampleNavCollapsibleItemsWithLinks,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ThirdLevelMenuItems: Story = {
  render: Template,
  args: {
    navItems: exampleThirdLevelMenuItems,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ThirdLevelMenuItemsParentsAreLinks: Story = {
  render: Template,
  args: {
    navItems: exampleThirdLevelMenuItemsLinks,
    ariaLabel: 'Menu title',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '1024px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CollapsibleToggle: React.FC = () => {
  return (
    <SideNav
      ariaLabel="Collapsible menu"
      navItems={exampleThirdLevelMenuItems}
      isCollapsed={true}
      isMobileOpen={true}
    />
  );
};

/**
 * Works only for desktop
 */
export const DefaultOpen: Story = {
  render: Template,
  args: {
    navItems: exampleDefaultOpen,
    ariaLabel: 'Default open menu',
    isMobileOpen: true,
  },
};

export const MediumSideNavItems: Story = {
  render: Template,
  args: {
    navItems: exampleThirdLevelMenuItems,
    ariaLabel: 'Default open menu',
    sideNavItemSize: 'medium',
  },
};

export const SmallSideNavItems: Story = {
  render: Template,
  args: {
    navItems: exampleThirdLevelMenuItems,
    ariaLabel: 'Default open menu',
    sideNavItemSize: 'small',
    showDividers: false,
  },
};
