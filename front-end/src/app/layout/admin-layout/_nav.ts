import { INavData } from "@coreui/angular";
export const navItems: INavData[] = [
   {
    name: 'Dashboard',
    url: '/admin/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/admin/themes/colors',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Typography',
    url: '/admin/themes/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Calendar',
    url: '/admin/components/calendar',
    iconComponent: { name: 'cil-calendar' }
  },
  {
    name: 'Login / Register',
    url: '/admin/components/login-register',
    iconComponent: { name: 'cil-lock-locked' }
  },
  {
    name: 'Web Pages',
    url: '/admin/components/web-pages',
    iconComponent: { name: 'cil-file'}
  },
  {
    name: 'Widgets',
    url: '/admin/components/widgets',
    iconComponent: { name: 'cil-library' }
  }

]
