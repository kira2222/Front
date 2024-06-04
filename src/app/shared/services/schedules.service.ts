import { Injectable } from '@angular/core';
import { colorentity } from '../../views/Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from '../../views/Model/Schedule';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  constructor(private http: HttpClient) {}

  /*  GetCustomer(): Observable<Customer[]> {
      return this.http.get<Customer[]>("http://localhost:3000/customer");
    }
  */
  GetCustomer(data: any) {
    return this.http.get(
      environment.apiUrl + '/clients/clientBy?phone=' + data
    );
  }

  GetSchedules(): Observable<Schedule[]> {
    return this.http
      .get<Schedule[]>(environment.apiUrl + '/schedules/all')
      .pipe(map((response) => response as Schedule[]));
  }

  GetSchedulesByUser(pi_suser: string | null) {
    return this.http.get(
      environment.apiUrl + '/users/scheduleByUser?email=' + pi_suser
    );
  }

  DeleteSchedule(data: any) {
    return this.http.delete(environment.apiUrl + '/schedules/delete/' + data);
  }

  Saveschedule(data: any) {
    return this.http.post(environment.apiUrl + '/schedules/register', data);
  }

  UpdateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(
      environment.apiUrl + '/schedules/update',
      schedule
    );
  }
  /*
  CreateCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl + 'clients/register', customer);
  }*/
}
