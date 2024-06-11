import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Inicio',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Ordenes',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Ordenes de Trabajo',
        url: '/base/accordion',
      },
      {
        name: 'Agenda',
        url: '/base/progress',
      },
    ],
  },
  {
    name: 'Ordenes de trabajo',
    url: '/ordenes-trabajo',
    iconComponent: { name: 'cil-list' },
  },
  {
    name: 'Paginas',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
      },
      {
        name: 'Gestionar Usuarios ',
        url: '/register',
      },
    ],
  },
  {
    name: 'Clientes',
    url: '/notifications',
    iconComponent: { name: 'cil-people' },
    children: [
      {
        name: 'Lista de Clientes',
        url: '/base/cards',
      },
    ],
  },
  {
    name: 'Mis Estadisticas',
    url: '/estadisticas',
    iconComponent: { name: 'cil-chart-pie' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
];

  
  // {
  //   name: 'Servicios',
  //   url: '/servicios',
  //   iconComponent: { name: 'cil-list' },
  //   children: [
  //     {
  //       name: 'Actividades de Servicio',
  //       url: '/servicios/actividades-servicio',
  //     },
  //     {
  //       name: 'Registro de Actividades',
  //       url: '/servicios/registro-actividades',
  //     },
  //   ],
  // },
 