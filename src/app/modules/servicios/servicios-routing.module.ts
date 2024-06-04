import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActividadesServicioComponent } from './views/actividades-servicio/actividades-servicio.component';
import { AgregarActividadesServicioComponent } from './views/actividades-servicio/agregar-actividades-servicio/agregar-actividades-servicio.component';
import { EditarActividadesServicioComponent } from './views/actividades-servicio/editar-actividades-servicio/editar-actividades-servicio.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Servicios',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'actividades-servicio',
      },
      {
        path: 'actividades-servicio',
        component: ActividadesServicioComponent,
        data: {
          title: 'Servicios / Actividades de Servicio',
        },
      },
      {
        path: 'actividades-servicio/agregar',
        component: AgregarActividadesServicioComponent,
      },
      {
        path: 'actividades-servicio/editar/:id',
        component: EditarActividadesServicioComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosRoutingModule {}
