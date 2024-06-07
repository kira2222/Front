import { Injectable } from '@angular/core';
import { colorentity } from '../views/Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Schedule } from '../views/Model/Schedule';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private apiUrl = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }



  /*  GetCustomer(): Observable<Customer[]> {
      return this.http.get<Customer[]>("http://localhost:3000/customer");
    }
  */
  GetCustomer(data: any) {
    return this.http.get("http://localhost:8080/api/clients/clientBy?phone=" + data);
  }

  GetSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl+"schedules/all").pipe(
      map(response => response as Schedule[])
    );
  } 
  
  GetSchedulesByUser(pi_suser:string|null ){
    return this.http.get(this.apiUrl+"users/scheduleByUser?email="+pi_suser);
  } 

  DeleteSchedule(data: any) {
    return this.http.delete("http://localhost:8080/api/schedules/delete/" + data);
  }

  Saveschedule(data: any) {
    return this.http.post("http://localhost:8080/api/schedules/register", data);
  }

  UpdateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.apiUrl + 'schedules/update', schedule);
  }
 /*
  CreateCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl + 'clients/register', customer);
  }*/

}
