import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
  TableModule,
  CardModule,
  AlertComponent,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

// [Views]
import { ActividadesServicioComponent } from './views/actividades-servicio/actividades-servicio.component';
import { AgregarActividadesServicioComponent } from './views/actividades-servicio/agregar-actividades-servicio/agregar-actividades-servicio.component';
import { EditarActividadesServicioComponent } from './views/actividades-servicio/editar-actividades-servicio/editar-actividades-servicio.component';

// [Views routing]
import { ServiciosRoutingModule } from './servicios-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDialogModule,
    FormsModule,
    AlertComponent,
  ],
  declarations: [
    ActividadesServicioComponent,
    AgregarActividadesServicioComponent,
    EditarActividadesServicioComponent,
  ],
})
export class ServiciosModule {}
