import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

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

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

// [Views]
import { OrdersComponent } from './views/orders.component';
import { AddOrdersComponent } from './views/add-orders/add-orders.component';

// [Views routing]
import { OrdersRoutingModule } from './orders-routing.module';

// [Pipes]
import { PriceFormatPipe } from './pipes/price-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
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
    MatSnackBarModule,
    MatButtonModule,
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
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,
    NgSelectModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  declarations: [OrdersComponent, AddOrdersComponent, PriceFormatPipe],
  providers: [provideNgxMask()],
})
export class OrdersModule {}
