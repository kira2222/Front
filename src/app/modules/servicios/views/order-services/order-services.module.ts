import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderServicesComponent } from './order-services.component';
import { OrderServicesRoutingModule } from './order-services-routing.module';

@NgModule({
  imports: [CommonModule, OrderServicesRoutingModule],
  declarations: [OrderServicesComponent],
})
export class OrderServicesModule {}
