import { Injectable } from '@angular/core';
import { colorentity } from '../views/Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Order } from '../views/Model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }


  GetOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + "orders/all").pipe(
      map(response => response as Order[])
    );
  }
  GetOrder(id: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + "orders/byId?id=" + id).pipe(
      map(response => response as Order[])
    );
  }

  UpdateOrders(order: Order): Observable<Order> {
    return this.http.put<Order>(this.apiUrl + 'orders/update', order);
  }

  Saveorders(data: any) {
    return this.http.post("http://localhost:8080/api/registerAll", data);
  }


}
