import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceTypeStatisticsDTO } from './ServiceTypeStatisticsDTO';
import { TechnicianEffectivenessDTO } from '../../modules/DTO/TechnicianEffectivenessDTO';
import { WarrantiesByTechnicianDTO } from '../../modules/DTO/WarrantiesByTechnicianDTO';
import { WarrantiesByTypeDTO } from '../../modules/DTO/WarrantiesByTypeDTO ';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl: string = 'http://localhost:8080/warranties/statistics/status';
  private baseUrls: string = 'http://localhost:8080/api/statistics';

  constructor(private http: HttpClient) {}

  getServiceStatusStatistics(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?startDate=${startDate}&endDate=${endDate}`).pipe(
      map(response => {
        return Object.keys(response).map(key => ({
          name: key,
          value: response[key]
        }));
      })
    );
  }

  getServiceTypesStatisticsByMonth(startDate: string, endDate: string): Observable<ServiceTypeStatisticsDTO[]> {
    return this.http.get<ServiceTypeStatisticsDTO[]>(`${this.baseUrls}/service-types?startDate=${startDate}&endDate=${endDate}`);
  }

  getTechnicianEffectivenessStatistics(startDate: string, endDate: string): Observable<TechnicianEffectivenessDTO[]> {
    return this.http.get<TechnicianEffectivenessDTO[]>(`${this.baseUrls}/technician-effectiveness?startDate=${startDate}&endDate=${endDate}`);
  }

  getWarrantiesByTechnician(startDate: string, endDate: string): Observable<WarrantiesByTechnicianDTO[]> {
    return this.http.get<WarrantiesByTechnicianDTO[]>(`${this.baseUrls}/warranties-by-technician?startDate=${startDate}&endDate=${endDate}`);
  }

  getWarrantiesByType(startDate: string, endDate: string): Observable<WarrantiesByTypeDTO[]> {
    return this.http.get<WarrantiesByTypeDTO[]>(`${this.baseUrls}/warranties-by-type?startDate=${startDate}&endDate=${endDate}`);
  }

  downloadTechnicianSettlementReport(): Observable<Blob> {
    const url = `${this.baseUrls}/technician-settlement`;
    return this.http.get(url, { responseType: 'blob' });
  }

  downloadServiceReports(): Observable<Blob> {
    const url = `${this.baseUrls}/service-report`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
