import { Component } from '@angular/core';
import { OrdersApiService } from '../services/orders-api.service';
import { Order } from '../models/Order';

@Component({
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.scss'],
})
export class OrdersComponent {
  orders: Order[] = [];
  totalRecords: number = 0;
  errorMessage: string = '';

  constructor(private ordersService: OrdersApiService) {}

  ngOnInit() {
    this.getOrders(1);
  }

  getOrders(page: number) {
    const response = this.ordersService.getAllOrders();

    response.subscribe({
      next: (value) => {
        console.log(value);
        this.orders = value;
        this.totalRecords = value.length;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage =
          'Ha ocurrido un problema al intentar traer los registros de la tabla. Por favor contacte un administrador de inmediato.';
      },
    });
  }
}
