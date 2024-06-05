import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderServicesComponent } from './order-services.component';

const routes: Routes = [
  {
    path: '',
    component: OrderServicesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderServicesRoutingModule {}
