import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActividadServicio } from '../models/ActividadServicio';
import { environment } from 'src/environments/environments';
import { ResultMessage } from 'src/app/shared/models/ResultMessage';
import { fromJsonToActivityService } from '../adapters/in/fromJsonToActivityService';

@Injectable({
  providedIn: 'root',
})
export class ActividadesServicioApiService {
  constructor(private http: HttpClient) {}

  public getAllActividadesDeServicio(): Observable<ActividadServicio[]> {
    return this.http
      .get<ResultMessage<{ content: ActividadServicio[] }>>(
        environment.apiUrl + '/serviceActivity'
      )
      .pipe(
        map((data: ResultMessage<{ content: ActividadServicio[] }>) => {
          return data.data.content.map(
            (activityService: ActividadServicio) =>
              new ActividadServicio(activityService)
          );
        })
      );
  }

  public getActividadDeServicioById(
    id: number
  ): Observable<ResultMessage<ActividadServicio>> {
    return this.http.get<ResultMessage<ActividadServicio>>(
      `${environment.apiUrl}/serviceActivity/${id}`
    );
  }

  public createActividadDeServicio(
    actividadServicio: ActividadServicio
  ): Observable<ResultMessage<ActividadServicio>> {
    return this.http.post<ResultMessage<ActividadServicio>>(
      `${environment.apiUrl}/serviceActivity`,
      actividadServicio
    );
  }

  public updateActividadDeServicio(
    id: number,
    actividadServicio: ActividadServicio
  ): Observable<ResultMessage<ActividadServicio>> {
    return this.http.put<ResultMessage<ActividadServicio>>(
      `${environment.apiUrl}/serviceActivity/${id}`,
      actividadServicio
    );
  }

  public deleteActividadDeServicio(id: number): Observable<ResultMessage<any>> {
    return this.http.delete<ResultMessage<any>>(
      `${environment.apiUrl}/serviceActivity/${id}`
    );
  }
}
