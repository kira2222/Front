import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesServicioComponent } from './actividades-servicio.component';
import { ActividadesServicioRoutingModule } from './actividades-servicio-routing.module';

@NgModule({
  imports: [CommonModule, ActividadesServicioRoutingModule],
  declarations: [ActividadesServicioComponent],
})
export class ActividadesServicioModule {}
