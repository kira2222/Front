import { Injectable } from '@angular/core';
import { colorentity } from '../views/Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Users } from '../views/Model/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }

  SaveUser(data: any) {
    return this.http.post("http://localhost:8080/api/users/register", data);
  }

  gettechnicalByName(data: any) {
    return this.http.get("http://localhost:8080/api/users/byName?name=" + data);
  }

  GetUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl + "users/all").pipe(
      map(response => response as Users[])
    );
  }

  UpdateUser(customer: Users): Observable<Users> {
    return this.http.put<Users>(this.apiUrl + 'users/update', customer);
  }

  DeleteUser(data: any) {
    return this.http.delete("http://localhost:8080/api/users/delete/" + data);
  }

}
