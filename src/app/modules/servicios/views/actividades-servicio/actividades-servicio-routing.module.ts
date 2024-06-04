import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesServicioComponent } from './actividades-servicio.component';

const routes: Routes = [
  {
    path: '',
    component: ActividadesServicioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesServicioRoutingModule {}
