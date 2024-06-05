import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/Order';
import { Client } from '../models/Client';
import { environment } from 'src/environments/environments';
import { ResultMessage } from 'src/app/shared/models/ResultMessage';
import { User } from '../../login/models/User';
import { Service } from '../models/Service';

@Injectable({
  providedIn: 'root',
})
export class OrdersApiService {
  constructor(private http: HttpClient) {}

  public getAllOrders(): Observable<Order[]> {
    return this.http
      .get<ResultMessage<{ content: Order[] }>>(environment.apiUrl + '/orders')
      .pipe(
        map((data: ResultMessage<{ content: Order[] }>) => {
          return data.data.content.map((order: Order) => new Order(order));
        })
      );
  }

  public createOrder(order: Order): Observable<ResultMessage<Order>> {
    return this.http.post<ResultMessage<Order>>(
      `${environment.apiUrl}/orders`,
      order
    );
  }

  public getActividadDeServicioById(
    id: number
  ): Observable<ResultMessage<Order>> {
    return this.http.get<ResultMessage<Order>>(
      `${environment.apiUrl}/orders/${id}`
    );
  }

  public updateActividadDeServicio(
    id: number,
    actividadServicio: Order
  ): Observable<ResultMessage<Order>> {
    return this.http.put<ResultMessage<Order>>(
      `${environment.apiUrl}/orders/${id}`,
      actividadServicio
    );
  }

  public deleteActividadDeServicio(id: number): Observable<ResultMessage<any>> {
    return this.http.delete<ResultMessage<any>>(
      `${environment.apiUrl}/orders/${id}`
    );
  }

  public searchClients(names: string): Observable<Client[]> {
    let params = new HttpParams().set('names', names);

    return this.http
      .get<ResultMessage<Client[]>>(environment.apiUrl + '/clients/search', {
        params,
      })
      .pipe(
        map((data: ResultMessage<Client[]>) => {
          return data.data.map((client: Client) => new Client(client));
        })
      );
  }

  public searchUsers(names: string): Observable<User[]> {
    let params = new HttpParams().set('name', names);

    return this.http
      .get<ResultMessage<User[]>>(environment.apiUrl + '/users/search', {
        params,
      })
      .pipe(
        map((data: ResultMessage<User[]>) => {
          return data.data.map((user: User) => new User(user));
        })
      );
  }

  public searchServices(description: string): Observable<Service[]> {
    let params = new HttpParams().set('description', description);

    return this.http
      .get<ResultMessage<Service[]>>(environment.apiUrl + '/services/search', {
        params,
      })
      .pipe(
        map((data: ResultMessage<Service[]>) => {
          return data.data.map((service: Service) => new Service(service));
        })
      );
  }
}
