import { Component } from '@angular/core';
import { ActividadesServicioApiService } from '../../services/actividades-servicio-api.service';
import { ActividadServicio } from '../../models/ActividadServicio';

@Component({
  templateUrl: 'actividades-servicio.component.html',
  styleUrls: ['actividades-servicio.component.scss'],
})
export class ActividadesServicioComponent {
  actividadesDeServicio: ActividadServicio[] = [];
  totalRecords: number = 0;
  errorMessage: string = '';

  constructor(
    private actividadesServicioService: ActividadesServicioApiService
  ) {}

  ngOnInit() {
    this.getActividadesDeServicio(1);
  }

  getActividadesDeServicio(page: number) {
    const response =
      this.actividadesServicioService.getAllActividadesDeServicio();

    response.subscribe({
      next: (value) => {
        console.log(value);
        this.actividadesDeServicio = value;
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
