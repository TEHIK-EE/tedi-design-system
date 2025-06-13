import { SideNavItemProps } from './components/sidenav-item/sidenav-item';

export const exampleNavItems: SideNavItemProps[] = [
  { href: '#', children: 'Home', icon: 'home' },
  { href: '#', children: 'Clients', icon: 'account_box' },
  { href: '/', children: 'Children', icon: 'child_care', isActive: true },
  { href: '#', children: 'Some very long text that doest fit anything and wraps', icon: 'assignment' },
  { href: '#', children: 'Assignments', icon: 'assignment' },
  { href: '#', children: 'Assignment that is a long text', icon: 'assignment' },
  { href: '#', children: 'Assignments', icon: 'assignment' },
];

export const exampleNavCollapsibleItems: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    children: 'Clinical Management',
    icon: 'medical_services',
    subItemGroups: [
      {
        subItems: [
          { href: '#', children: 'Vital Signs' },
          { href: '#', children: 'Assessments' },
          {
            href: '#',
            children: 'Treatments',
          },
          {
            href: '#',
            children: 'Documentation',
          },
        ],
      },
    ],
  },
  {
    children: 'Administration',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
      {
        href: '#',
        children: 'System Settings',
      },
      {
        href: '#',
        children: 'Reports & Analytics',
      },
    ],
  },
  { href: '#', children: 'Inventory Management', icon: 'inventory' },
  { href: '#', children: 'Billing & Finance', icon: 'payments' },
];

export const exampleDefaultOpen: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    children: 'Clinical Management',
    icon: 'medical_services',
    subItemGroups: [
      {
        subItems: [
          { href: '#', children: 'Vital Signs' },
          { href: '#', children: 'Assessments' },
          {
            href: '#',
            children: 'Treatments',
          },
          {
            href: '#',
            children: 'Documentation',
          },
        ],
      },
    ],
  },
  {
    children: 'Administration',
    isDefaultOpen: true,
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
      {
        href: '#',
        children: 'System Settings',
      },
      {
        href: '#',
        children: 'Reports & Analytics',
      },
    ],
  },
  { href: '#', children: 'Inventory Management', icon: 'inventory' },
  { href: '#', children: 'Billing & Finance', icon: 'payments' },
];

export const exampleNavCollapsibleItemsWithLinks: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    href: '#critical-management',
    children: 'Clinical Management',
    icon: 'medical_services',
    subItems: [
      { href: '#', children: 'Vital Signs' },
      { href: '#', children: 'Assessments' },
      {
        href: '#',
        children: 'Treatments',
      },
      {
        href: '#',
        children: 'Documentation',
      },
    ],
  },
  {
    href: '#',
    children: 'Administration',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
      {
        href: '#',
        children: 'System Settings',
      },
      {
        href: '#',
        children: 'Reports & Analytics',
      },
    ],
  },
  { href: '#', children: 'Inventory Management', icon: 'inventory' },
  { href: '#', children: 'Billing & Finance', icon: 'payments' },
];

export const exampleThirdLevelMenuItems: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    children: 'Clinical Management',
    icon: 'medical_services',
    subItems: [
      { href: '#', children: 'Vital Signs' },
      { href: '#', children: 'Assessments' },
      {
        children: 'Treatments',
        subItems: [
          { href: '#', children: 'Active Treatments' },
          { href: '#', children: 'Treatment History' },
          { href: '#', children: 'Treatment Plans' },
          { href: '#', children: 'Clinical Protocols' },
        ],
      },
      {
        children: 'Documentation',
        subItems: [
          { href: '#', children: 'Clinical Notes' },
          { href: '#', children: 'Medical Forms' },
          { href: '#', children: 'Consent Forms' },
          { href: '#', children: 'Reports' },
        ],
      },
    ],
  },
  {
    children: 'Administration',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
    ],
  },
  { href: '#', children: 'Inventory Management', icon: 'inventory' },
  { href: '#', children: 'Billing & Finance', icon: 'payments' },
];

export const exampleThirdLevelMenuItemsLinks: SideNavItemProps[] = [
  { href: '#', children: 'Dashboard', icon: 'dashboard' },
  { href: '#', children: 'Patient Records', icon: 'people' },
  {
    children: 'Clinical Management',
    href: '#',
    icon: 'medical_services',
    subItems: [
      { href: '#', children: 'Vital Signs' },
      { href: '#', children: 'Assessments' },
      {
        href: '#',
        children: 'Treatments',
        subItems: [
          { href: '#', children: 'Active Treatments' },
          { href: '#', children: 'Treatment History' },
          { href: '#', children: 'Treatment Plans' },
          { href: '#', children: 'Clinical Protocols' },
        ],
      },
      {
        href: '#',
        children: 'Documentation',
        subItems: [
          { href: '#', children: 'Clinical Notes' },
          { href: '#', children: 'Medical Forms' },
          { href: '#', children: 'Consent Forms' },
          { href: '#', children: 'Reports' },
        ],
      },
    ],
  },
  {
    href: '#',
    children: 'Administration',
    icon: 'admin_panel_settings',
    subItems: [
      { href: '#', children: 'Staff Management' },
      { href: '#', children: 'Scheduling' },
    ],
  },
  { href: '#', children: 'Inventory Management', icon: 'inventory' },
  { href: '#', children: 'Billing & Finance', icon: 'payments' },
];
