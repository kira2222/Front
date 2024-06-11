// src/app/services/statistics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ServiceTypeStatisticsDTO} from "./ServiceTypeStatisticsDTO"
import {TechnicianEffectivenessDTO} from "../../modules/DTO/TechnicianEffectivenessDTO"
import {WarrantiesByTechnicianDTO} from "../../modules/DTO/WarrantiesByTechnicianDTO"
import {WarrantiesByTypeDTO} from "../../modules/DTO/WarrantiesByTypeDTO "
@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl: string = 'http://localhost:8080/warranties/statistics/status';
  private baseUrls: string = 'http://localhost:8080/api/statistics';
  constructor(private http: HttpClient) {}

  getServiceStatusStatistics(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => {
        return Object.keys(response).map(key => ({
          name: key,
          value: response[key]
        }));
      })
    );
  }
  getServiceTypesStatisticsByMonth(): Observable<ServiceTypeStatisticsDTO[]> {
    return this.http.get<ServiceTypeStatisticsDTO[]>(`${this.baseUrls}/service-types`);
  }
  getTechnicianEffectivenessStatistics(): Observable<TechnicianEffectivenessDTO[]> {
    return this.http.get<TechnicianEffectivenessDTO[]>(`${this.baseUrls}/technician-effectiveness`);
  }
  getWarrantiesByTechnician(): Observable<WarrantiesByTechnicianDTO[]> {
    return this.http.get<WarrantiesByTechnicianDTO[]>(`${this.baseUrls}/warranties-by-technician`);
  }
  getWarrantiesByType(): Observable<WarrantiesByTypeDTO[]> {
    return this.http.get<WarrantiesByTypeDTO[]>(`${this.baseUrls}/warranties-by-type`);
  }

  downloadTechnicianSettlementReport(): Observable<Blob> {
    const url = `${this.baseUrls}/technician-settlement`;
    return this.http.get(url, { responseType: 'blob' });
  }
  downloadServiceReports(): Observable<Blob> {
    const url = `${this.baseUrls}/service-reports`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
