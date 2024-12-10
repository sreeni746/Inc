import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Admin',
    url: '/admin',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'Agent',
        url: '/admin/agents',
      },

      {
        name: 'Level',
        url: '/admin/level',
      },
    ],
  },
];
