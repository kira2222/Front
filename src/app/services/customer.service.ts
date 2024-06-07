import { Injectable } from '@angular/core';
import { colorentity } from '../views/Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Customer } from '../views/Model/Customer';

@Injectable({
  providedIn: 'root'
})
export class customerService {
  private apiUrl = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }



  /*  GetCustomer(): Observable<Customer[]> {
      return this.http.get<Customer[]>("http://localhost:3000/customer");
    }
  */
  GetCustomer(data: any) {
    return this.http.get("http://localhost:8080/api/clients/clientBy?phone=" + data);
  }

  GetCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl+"clients/all").pipe(
      map(response => response as Customer[])
    );
  }  

  UpdateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl + 'clients/update', customer);
  }

  CreateCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl + 'clients/register', customer);
  }

}
